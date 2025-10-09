import { commandHistorySlice } from "../../../store/utils";

export function finalizeMoveCommand(selectedShapeIds, shapes) {
    const newProps = {};
    selectedShapeIds.forEach((id) => {
        const s = shapes[id];
        newProps[id] = { x: s.x, y: s.y };
    });

    commandHistorySlice.getSlice().finalizeCommand({ newProps });
}
