import { finalizeResizeCommand } from "../commands/finalizeResizeCommand";

export const finalizeResizeSelection = (tool, selectedShapeIds, shapes) => {
    if (!tool.resizing) return;

    finalizeResizeCommand(selectedShapeIds, shapes);
};
