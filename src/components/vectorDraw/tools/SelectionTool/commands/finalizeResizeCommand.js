import { commandHistorySlice } from "../../../store/utils";

export function finalizeResizeCommand(selectedShapeIds, shapes) {
    const newProps = {};
    selectedShapeIds.forEach((id) => (newProps[id] = { ...shapes[id] }));

    commandHistorySlice.getSlice().finalizeCommand({ newProps });
}
