import { finalizeMoveCommand } from "../commands/finalizeMoveCommand";

export const finalizeMoveSelection = (tool, selectedShapeIds, shapes) => {
    if (!tool.moving) return;

    finalizeMoveCommand(selectedShapeIds, shapes);
};
