import { computeResizedBoundingBox } from "../resize/computeResizedBoundingBox";
import { shapeResizeHandlers } from "./../resize/shapeResizeHandlers";

export function handleResizeSelection(
    tool,
    pointer,
    selectedShapeIds,
    selectedShapesBounds,
    updateShape
) {
    // Return if resize cannot happen
    if (!tool.resizing || !tool.activeHandle || !selectedShapesBounds) return;

    const { x, y, width, height } = tool.originalBounds;

    // 1. Compute new bounding box + origin
    const { newW, newH, origin } = computeResizedBoundingBox(
        tool.activeHandle,
        { x, y, width, height },
        pointer
    );

    // 2. Calculate scale factors
    const { scaleX, scaleY } = computeScaleFactors(width, height, newW, newH);

    // 3. Delegate to shape-specific resize
    selectedShapeIds.forEach((id) => {
        const original = tool.originalShapes[id];
        const resizeShapeFn = shapeResizeHandlers[original.type];

        const updated = resizeShapeFn({
            shape: original,
            handle: tool.activeHandle,
            pointer,
            scaleX,
            scaleY,
            pivot: origin,
        });

        updateShape(id, updated);
    });
}

function computeScaleFactors(oldW, oldH, newW, newH) {
    return {
        scaleX: newW / oldW,
        scaleY: newH / oldH,
    };
}
