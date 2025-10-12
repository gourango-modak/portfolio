import { commandHistorySlice } from "../../../store/utils";

export function beginResizeCommand(selectedIds, objects, type) {
    const prevProps = {};
    selectedIds.forEach((id) => (prevProps[id] = { ...objects[id] }));

    commandHistorySlice.getSlice().beginCommand(type, { prevProps });
}
