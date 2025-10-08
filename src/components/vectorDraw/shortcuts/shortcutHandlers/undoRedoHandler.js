import { commandHistorySlice } from "../../store/utils";

export const undoRedoShortcutHandler = (e) => {
    const { undo, redo } = commandHistorySlice.getSlice();
    if (!e.ctrlKey) return false;

    const key = e.key.toLowerCase();
    if (key === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
        return true;
    }
    if (key === "y") {
        e.preventDefault();
        redo();
        return true;
    }
    return false;
};
