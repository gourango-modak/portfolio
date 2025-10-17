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

    // Filter to only selected elements if required
    if (onlySelected) {
        exportShapeIds = [...selectedShapeIds];
        exportShapes = Object.fromEntries(
            exportShapeIds.map((id) => [id, shapes[id]])
        );

        exportFrameIds = [...selectedFrameIds];
        exportFrames = Object.fromEntries(
            exportFrameIds.map((id) => [id, frames[id]])
        );

        // --- Special Case: Single selected frame, no shape selected ---
        if (selectedFrameIds.size === 1 && selectedShapeIds.size === 0) {
            const frameId = [...selectedFrameIds][0];
            const frame = frames[frameId];
            if (frame) {
                const shapesUnderFrame = Object.entries(shapes)
                    .filter(
                        ([_, shape]) =>
                            shape.frameId === frameId &&
                            shape.isFrameTitle !== true
                    )
                    .map(([id]) => id);

                exportShapeIds = shapesUnderFrame;
                exportShapes = Object.fromEntries(
                    shapesUnderFrame.map((id) => [id, shapes[id]])
                );

                // Exclude the frame itself in this case
                exportFrameIds = [];
                exportFrames = {};
            }
        } else {
            // For normal cases: include selected frames and their shapes
            const frameShapes = Object.entries(shapes)
                .filter(
                    ([_, shape]) =>
                        selectedFrameIds.has(shape.frameId) &&
                        shape.isFrameTitle !== true
                )
                .map(([id]) => id);

            for (const id of frameShapes) {
                if (!exportShapeIds.includes(id)) exportShapeIds.push(id);
            }

            exportShapes = Object.fromEntries(
                exportShapeIds.map((id) => [id, shapes[id]])
            );
        }
    }

    // 1. Validate export targets
    const hasShapes = exportShapeIds.length > 0;
    const hasFrames = exportFrameIds.length > 0;

    if (!hasShapes && !hasFrames) {
        debugLog("No shapes or frames found — nothing to export.");
        return null;
    }

    // 2. Build export SVG group
    const exportGroup = createExportGroup(
        exportFrames,
        exportShapes,
        exportFrameIds,
        exportShapeIds
    );

    // 3. Compute bounding box
    const shapesBBox = hasShapes
        ? computeShapesBoundingBox(exportShapeIds, exportShapes)
        : null;
    const framesBBox = hasFrames
        ? computeFramesBoundingBox(exportFrameIds, exportFrames)
        : null;
    const bbox = combineBoundingBoxes([shapesBBox, framesBBox]);

    // 4. Export to image
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
