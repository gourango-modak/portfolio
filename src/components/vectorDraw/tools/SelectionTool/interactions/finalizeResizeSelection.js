import { finalizeResizeCommand } from "../commands/finalizeResizeCommand";

export const finalizeResizeSelection = (
    tool,
    selectedIds,
    objects,
    commandTye
) => {
    if (!tool.resizing) return;

    finalizeResizeCommand(selectedIds, objects, commandTye);
};
