import { findShapeAtPoint } from "../../../shapes/utils";
import { canvasPropertiesSlice } from "../../../store/utils";
import { isPointInRect } from "../../../utils/geometryUtils";

export const updateSelectionCursor = (
    tool,
    pointer,
    shapes,
    selectedShapeIds,
    selectedShapesBounds
) => {
    if (tool.resizing) return;

    const { setCursor } = canvasPropertiesSlice.getSlice();

    // 1. Check if pointer is inside selected shapes bounding box
    if (selectedShapesBounds && isPointInRect(pointer, selectedShapesBounds)) {
        setCursor("move");
        return;
    }

    // 2. Check if pointer is over any individual shape (skip selected shapes)
    for (const id in shapes) {
        if (selectedShapeIds.has(id)) continue;
        if (findShapeAtPoint(shapes[id], pointer)) {
            setCursor("move");
            return;
        }
    }

    // 3. Default cursor if pointer not over any shape
    setCursor("default");
};
