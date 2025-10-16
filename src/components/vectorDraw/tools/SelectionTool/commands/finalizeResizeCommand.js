import { commandHistorySlice } from "../../../store/utils";
import { getChangedProps } from "../../../utils/canvasUtils";

export function finalizeResizeCommand(selectedIds, currentObjects, type) {
    const { currentCommands } = commandHistorySlice.getSlice();
    const currentCommand = currentCommands[type];
    if (!currentCommand) return;

    const prevProps = currentCommand.prevProps;
    const newProps = {};

    selectedIds.forEach((id) => {
        const prev = prevProps[id];
        const curr = currentObjects[id];
        if (!prev || !curr) return;

        const changed = getChangedProps(prev, curr);
        if (Object.keys(changed).length > 0) {
            newProps[id] = changed;
        }
    });

    if (Object.keys(newProps).length === 0) return;

    commandHistorySlice.getSlice().finalizeCommand(type, { newProps });
}
