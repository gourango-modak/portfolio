import { shapeSlice } from "../../../store/utils";

export function clearSelection(tool) {
    if (tool.resizing || tool.clickedInsideSelection) return;

    shapeSlice.getSlice().deselectAll();
    tool.clickedInsideSelection = false;
}
