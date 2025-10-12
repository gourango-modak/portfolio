import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";
import { isPointInRect } from "../../../utils/geometryUtils";
import { beginMoveCommand } from "../commands/beginMoveCommand";

export function tryStartMove(tool, pointer, bounds, selectedShapeIds, shapes) {
    if (!bounds) return;
    if (!isPointInRect(pointer, bounds)) return;

    tool.clickedInsideSelection = true;
    beginMoveCommand(selectedShapeIds, shapes, COMMANDS.UPDATE_SHAPES);
}
