// Move selected shapes based on pointer movement.
export function handleMoveSelection(
    tool,
    pointer,
    shapes,
    selectedShapeIds,
    updateShape,
    frames,
    selectedFrameIds,
    updateFrame,
    moveThreshold = 3
) {
    if (tool.resizing) return;

    const { dx, dy, dist } = computePointerDelta(tool, pointer);

    // If we're not yet moving, check if we should start
    if (!tool.moving) {
        if (!tool.clickedInsideSelection || dist <= moveThreshold) return;

        tool.moving = true; // Start move mode
    }

    applyMove(selectedShapeIds, shapes, dx, dy, updateShape);
    applyMove(selectedFrameIds, frames, dx, dy, updateFrame);

    return true;
}

// Compute the delta between the current pointer and last pointer.
function computePointerDelta(tool, pointer) {
    return {
        dx: pointer.x - tool.lastPointer.x,
        dy: pointer.y - tool.lastPointer.y,
        dist: Math.hypot(
            pointer.x - tool.startPoint.x,
            pointer.y - tool.startPoint.y
        ),
    };
}

// Apply movement delta to all selected shapes.
function applyMove(selectedIds, objects, dx, dy, update) {
    selectedIds.forEach((id) => {
        const object = objects[id];
        update(id, { x: object.x + dx, y: object.y + dy });
    });
}
