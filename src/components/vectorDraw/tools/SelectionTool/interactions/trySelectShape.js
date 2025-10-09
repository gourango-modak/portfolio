import { getShapeAtPoint } from "../../../shapes/utils";
import { shapeSlice } from "../../../store/utils";
import { beginMoveCommand } from "../commands/beginMoveCommand";

export function trySelectShape(tool, pointer) {
    const clickedShape = getShapeAtPoint(pointer);

    if (!clickedShape) return;

    const store = shapeSlice.getSlice();

    // If clicked shape isn't already selected, select it (single-select)
    if (!store.selectedShapeIds.has(clickedShape.id)) {
        store.deselectAll();
        store.selectShape(clickedShape.id);
    }

    // Mark that the pointer started inside the selection (affects move vs drag)
    tool.clickedInsideSelection = true;

    beginMoveCommand(store.selectedShapeIds, store.shapes);
}
