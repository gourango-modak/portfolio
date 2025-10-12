import { finalizeMoveCommand } from "../commands/finalizeMoveCommand";

export const finalizeMoveSelection = (
    tool,
    selectedIds,
    objects,
    commandType
) => {
    if (!tool.moving) return;

    finalizeMoveCommand(selectedIds, objects, commandType);
};
