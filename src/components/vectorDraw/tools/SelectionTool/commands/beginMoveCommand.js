import { commandHistorySlice } from "../../../store/utils";

export function beginMoveCommand(selectedIds, objects, commandType) {
    const prevProps = {};
    selectedIds.forEach((id) => {
        const s = objects[id];
        prevProps[id] = { x: s.x, y: s.y };
    });

    commandHistorySlice.getSlice().beginCommand(commandType, { prevProps });
}
