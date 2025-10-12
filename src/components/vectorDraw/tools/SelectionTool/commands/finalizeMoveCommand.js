import { commandHistorySlice } from "../../../store/utils";

export function finalizeMoveCommand(selectedIds, objects, commandType) {
    const newProps = {};
    selectedIds.forEach((id) => {
        const s = objects[id];
        newProps[id] = { x: s.x, y: s.y };
    });

    commandHistorySlice.getSlice().finalizeCommand(commandType, { newProps });
}
