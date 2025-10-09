import { shapeSlice } from "../../store/utils";
import { getCanvasLastPointerPosition } from "../../utils/canvasUtils";

export const copyPasteShortcutHandler = (e) => {
    const { copySelectedShapes, pasteShapesAt } = shapeSlice.getSlice();
    if (!e.ctrlKey) return false;

    const key = e.key.toLowerCase();
    if (key === "c") {
        e.preventDefault();
        copySelectedShapes();
        return true;
    }
    if (key === "v") {
        e.preventDefault();
        pasteShapesAt(getCanvasLastPointerPosition());
        return true;
    }
    return false;
};
