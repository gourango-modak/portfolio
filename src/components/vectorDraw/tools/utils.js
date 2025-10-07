import { isPointInRect } from "../utils/geometryUtils";
import { findShapeAtPoint } from "../shapes/utils";
import { canvasPropertiesSlice } from "../store/utils";

export function getScreenPoint({ x, y }) {
    const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
    return {
        x: x * scale + pan.x,
        y: y * scale + pan.y,
    };
}

// Update Selection Tool cursor based on pointer position and shapes
export const updateSelectionToolCursor = (
    pointer,
    shapes,
    selectedShapeIds,
    selectedShapesBounds
) => {
    let cursorSet = false;

    const { setCursor } = canvasPropertiesSlice.getSlice();

    // 1. Check if pointer is inside selected shapes bounding box
    if (selectedShapesBounds && isPointInRect(pointer, selectedShapesBounds)) {
        setCursor("move");
        cursorSet = true;
    }

    // 2. Check if pointer is over any individual shape (skip selected shapes)
    if (!cursorSet) {
        for (const id in shapes) {
            if (selectedShapeIds.has(id)) continue;
            if (findShapeAtPoint(shapes[id], pointer)) {
                setCursor("move");
                cursorSet = true;
                break; // early exit for performance
            }
        }
    }

    // 3. Default cursor if pointer not over any shape
    if (!cursorSet) setCursor("default");
};
