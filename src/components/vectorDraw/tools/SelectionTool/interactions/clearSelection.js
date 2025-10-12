import { frameSlice, shapeSlice } from "../../../store/utils";

export function clearSelection(tool) {
    if (tool.resizing || tool.clickedInsideSelection) return;

    shapeSlice.getSlice().deselectAll();
    frameSlice.getSlice().deselectAll();
    tool.clickedInsideSelection = false;
}
