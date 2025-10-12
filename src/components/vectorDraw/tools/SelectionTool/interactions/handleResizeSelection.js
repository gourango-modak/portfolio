import { computeResizedBoundingBox } from "../resize/computeResizedBoundingBox";
import { resizeHandlers } from "../resize/resizeHandlers";

export function handleResizeSelection(
    tool,
    pointer,
    selectedIds,
    originalObjects,
    originalBounds,
    selectedBounds,
    update
) {
    // Return if resize cannot happen
    if (!tool.resizing || !tool.activeHandle || !selectedBounds) return;
    const { x, y, width, height } = originalBounds;

    // 1. Compute new bounding box + origin
    const { newW, newH, origin } = computeResizedBoundingBox(
        tool.activeHandle,
        { x, y, width, height },
        pointer
    );

    // 2. Calculate scale factors
    const { scaleX, scaleY } = computeScaleFactors(width, height, newW, newH);

    // 3. Delegate to shape-specific resize
    selectedIds.forEach((id) => {
        const original = originalObjects[id];
        const resizeShapeFn = resizeHandlers[original.type];

        const updated = resizeShapeFn({
            object: original,
            handle: tool.activeHandle,
            pointer,
            scaleX,
            scaleY,
            pivot: origin,
        });

        update(id, updated);
    });
}

function computeScaleFactors(oldW, oldH, newW, newH) {
    return {
        scaleX: newW / oldW,
        scaleY: newH / oldH,
    };
}
