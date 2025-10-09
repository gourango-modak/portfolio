import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";
import { commandHistorySlice } from "../../../store/utils";

export function beginResizeCommand(selectedShapeIds, shapes) {
    const prevProps = {};
    selectedShapeIds.forEach((id) => (prevProps[id] = { ...shapes[id] }));

    commandHistorySlice
        .getSlice()
        .beginCommand(COMMANDS.UPDATE_SHAPES, { prevProps });
}
