import { getShapeAtPoint } from "../../../shapes/utils";
import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";
import { shapeSlice } from "../../../store/utils";
import { beginMoveCommand } from "../commands/beginMoveCommand";

export function trySelectShape(tool, pointer, selectedShapeIds, shapes) {
    const clickedShape = getShapeAtPoint(pointer, shapes);

    if (!clickedShape) return;

    const { deselectAll, selectShape } = shapeSlice.getSlice();

    // If clicked shape isn't already selected, select it (single-select)
    if (!selectedShapeIds.has(clickedShape.id)) {
        deselectAll();
        selectShape(clickedShape.id);
    }

    // Mark that the pointer started inside the selection (affects move vs drag)
    tool.clickedInsideSelection = true;

    beginMoveCommand(selectedShapeIds, shapes, COMMANDS.UPDATE_SHAPES);
}
