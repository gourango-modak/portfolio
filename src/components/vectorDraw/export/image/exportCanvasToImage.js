import { debugLog } from "../../../../utils/common";
import { combineBoundingBoxes } from "../../boundingBox/combineBoundingBoxes";
import { computeFramesBoundingBox } from "../../boundingBox/framesBoundingBox";
import { computeShapesBoundingBox } from "../../boundingBox/shapesBoundingBox";
import { frameSlice, shapeSlice } from "../../store/utils";
import { createFrameSvg } from "../frames/frameSvg";
import { shapeToSvgElement } from "../shapes";
import { exportElementToImage } from "./exportElementToImage";

export const exportCanvasToImage = async ({ padding = 50, scale = 1 }) => {
    const { shapes, shapeOrder } = shapeSlice.getSlice();
    const { frames, frameOrder } = frameSlice.getSlice();

    // 1. Check if there’s anything to export
    const hasShapes = shapeOrder.length > 0;
    const hasFrames = frameOrder.length > 0;

    if (!hasShapes && !hasFrames) {
        debugLog("No shapes or frames found — nothing to export.");
        return null;
    }

    // 2. Create combined export group
    const exportGroup = createExportGroup(frames, shapes);

    const shapesBBox = computeShapesBoundingBox(shapeOrder, shapes);
    const framesBBox = computeFramesBoundingBox(frameOrder, frames);
    const bbox = combineBoundingBoxes([shapesBBox, framesBBox]);

    // 3. Export to image
    return await exportElementToImage({
        element: exportGroup,
        bbox,
        padding,
        scale,
    });
};

// Create an SVG <g> containing both frames and shapes
function createExportGroup(frames, shapes) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Append frames first (so shapes appear on top)
    Object.values(frames).forEach((frame) => {
        const svgEl = createFrameSvg(frame);
        if (svgEl) g.appendChild(svgEl);
    });

    // Append shapes
    Object.values(shapes).forEach((shape) => {
        const svgEl = shapeToSvgElement(shape);
        if (svgEl) g.appendChild(svgEl);
    });

    return g;
}
