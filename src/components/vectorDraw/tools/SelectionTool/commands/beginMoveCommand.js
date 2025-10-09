import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";
import { commandHistorySlice } from "../../../store/utils";

export function beginMoveCommand(selectedShapeIds, shapes) {
    const prevProps = {};
    selectedShapeIds.forEach((id) => {
        const s = shapes[id];
        prevProps[id] = { x: s.x, y: s.y };
    });

    commandHistorySlice
        .getSlice()
        .beginCommand(COMMANDS.UPDATE_SHAPES, { prevProps });
}
