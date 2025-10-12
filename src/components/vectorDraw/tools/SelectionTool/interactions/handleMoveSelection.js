import { shapeSlice } from "../../../store/utils";

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
function applyMove(selectedShapeIds, shapes, dx, dy, updateShape) {
    selectedShapeIds.forEach((id) => {
        const shape = shapes[id];
        updateShape(id, { x: shape.x + dx, y: shape.y + dy });
    });
}

// Move selected shapes based on pointer movement.
export function handleMoveSelection(
    tool,
    pointer,
    shapes,
    selectedShapeIds,
    updateShape,
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

    return true;
}
