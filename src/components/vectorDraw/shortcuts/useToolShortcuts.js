import { useEffect, useRef } from "react";
import { isTypingInInput, revertTool } from "./utils";
import { undoRedoShortcutHandler } from "./shortcutHandlers/undoRedoHandler";
import { copyPasteShortcutHandler } from "./shortcutHandlers/copyPasteHandler";
import { deleteShortcutHandler } from "./shortcutHandlers/deleteHandler";
import { toolShortcutHandler } from "./shortcutHandlers/toolHandler";
import { shiftKeyHandler } from "./shortcutHandlers/shiftKeyHandler";
import { escapeKeyHandler } from "./shortcutHandlers/escapeKeyHandler";
import { canvasModelKeyHandler } from "./shortcutHandlers/canvasModelKeyHandler";

export const useToolShortcuts = () => {
    const lastActivatedToolRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (escapeKeyHandler(e)) return;
            if (canvasModelKeyHandler(e)) return;
            if (isTypingInInput(e)) return;
            if (shiftKeyHandler(e)) return;
            if (undoRedoShortcutHandler(e)) return;
            if (copyPasteShortcutHandler(e)) return;
            if (deleteShortcutHandler(e)) return;
            toolShortcutHandler(e, lastActivatedToolRef);
        };

        const handleKeyUp = (e) => {
            shiftKeyHandler(e);
            canvasModelKeyHandler(e);
            revertTool(lastActivatedToolRef);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
};
