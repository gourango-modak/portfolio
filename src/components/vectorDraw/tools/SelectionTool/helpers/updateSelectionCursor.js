import { HANDLE_CURSORS } from "../../../components/SelectionOutlineLayer/constants";
import { getBoundingBoxHandleAtPoint } from "../../../components/SelectionOutlineLayer/utils";
import { findShapeAtPoint } from "../../../shapes/utils";
import { canvasPropertiesSlice } from "../../../store/utils";
import { isPointInRect } from "../../../utils/geometryUtils";

export const updateSelectionCursor = (
    tool,
    pointer,
    shapes,
    frames,
    selectedShapeIds,
    selectedShapesBounds
) => {
    const { setCursor } = canvasPropertiesSlice.getSlice();

    // 1. If currently resizing
    if (tool.resizing && tool.activeHandle) {
        setCursor(HANDLE_CURSORS[tool.activeHandle]);
        return;
    }

    // 2. Pointer inside selected shapes bounding box
    if (selectedShapesBounds && isPointInRect(pointer, selectedShapesBounds)) {
        setCursor("move");
        return;
    }

    // 3. Pointer over a frame border
    for (const id in frames) {
        const frame = frames[id];
        const { x, y, width, height } = frame;
        if (
            getBoundingBoxHandleAtPoint(pointer, {
                x,
                y,
                width: width.value,
                height: height.value,
            })
        ) {
            setCursor("move");
            return;
        }
    }

    // 4. Pointer over individual shapes (skip selected)
    for (const id in shapes) {
        if (selectedShapeIds.has(id)) continue;
        if (findShapeAtPoint(shapes[id], pointer)) {
            setCursor("move");
            return;
        }
    }

    // 5. Default cursor
    setCursor("default");
};
