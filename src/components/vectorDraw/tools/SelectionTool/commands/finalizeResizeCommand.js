import { commandHistorySlice } from "../../../store/utils";

export function finalizeResizeCommand(selectedIds, objects, type) {
    const newProps = {};
    selectedIds.forEach((id) => (newProps[id] = { ...objects[id] }));

    commandHistorySlice.getSlice().finalizeCommand(type, { newProps });
}
