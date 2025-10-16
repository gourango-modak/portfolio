import { debugLog } from "../../../../utils/common";
import { combineBoundingBoxes } from "../../boundingBox/combineBoundingBoxes";
import { computeFramesBoundingBox } from "../../boundingBox/framesBoundingBox";
import { computeShapesBoundingBox } from "../../boundingBox/shapesBoundingBox";
import { frameSlice, shapeSlice } from "../../store/utils";
import { createFrameSvg } from "../frames/frameSvg";
import { shapeToSvgElement } from "../shapes";
import { exportElementToImage } from "./exportElementToImage";

export const exportCanvasToImage = async ({
    padding = 50,
    scale = 1,
    background = false,
    onlySelected = false,
}) => {
    const { shapes, shapeOrder, selectedShapeIds } = shapeSlice.getSlice();
    const { frames, frameOrder, selectedFrameIds } = frameSlice.getSlice();

    let exportShapes = shapes;
    let exportShapeIds = shapeOrder;
    let exportFrames = frames;
    let exportFrameIds = frameOrder;

    // If onlySelected is true, filter to selected items
    if (onlySelected) {
        exportShapeIds = [...selectedShapeIds];
        exportShapes = Object.fromEntries(
            exportShapeIds.map((id) => [id, shapes[id]])
        );

        exportFrameIds = [...selectedFrameIds];
        exportFrames = Object.fromEntries(
            exportFrameIds.map((id) => [id, frames[id]])
        );
    }

    // 1. Check if there’s anything to export
    const hasShapes = exportShapeIds.length > 0;
    const hasFrames = exportFrameIds.length > 0;

    if (!hasShapes && !hasFrames) {
        debugLog("No shapes or frames found — nothing to export.");
        return null;
    }

    // 2. Create combined export group
    const exportGroup = createExportGroup(
        exportFrames,
        exportShapes,
        exportFrameIds,
        exportShapeIds
    );

    const shapesBBox = hasShapes
        ? computeShapesBoundingBox(exportShapeIds, exportShapes)
        : null;
    const framesBBox = hasFrames
        ? computeFramesBoundingBox(exportFrameIds, exportFrames)
        : null;
    const bbox = combineBoundingBoxes([shapesBBox, framesBBox]);

    // 3. Export to image
    return await exportElementToImage({
        element: exportGroup,
        bbox,
        padding,
        scale,
        background,
    });
};

// Create an SVG <g> containing frames and shapes
function createExportGroup(frames, shapes, frameIds, shapeIds) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Append frames first
    frameIds.forEach((id) => {
        const frame = frames[id];
        if (!frame) return;
        const svgEl = createFrameSvg(frame);
        if (svgEl) g.appendChild(svgEl);
    });

    // Append shapes
    shapeIds.forEach((id) => {
        const shape = shapes[id];
        if (!shape) return;
        const svgEl = shapeToSvgElement(shape);
        if (svgEl) g.appendChild(svgEl);
    });

    return g;
}
