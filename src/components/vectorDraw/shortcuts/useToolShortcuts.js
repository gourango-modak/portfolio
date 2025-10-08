import { useEffect, useRef } from "react";
import { isTypingInInput, revertTool } from "./utils";
import { undoRedoShortcutHandler } from "./shortcutHandlers/undoRedoHandler";
import { copyPasteShortcutHandler } from "./shortcutHandlers/copyPasteHandler";
import { deleteShortcutHandler } from "./shortcutHandlers/deleteHandler";
import { toolShortcutHandler } from "./shortcutHandlers/toolHandler";

export const useToolShortcuts = () => {
    const lastActivatedToolRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isTypingInInput(e)) return;
            if (undoRedoShortcutHandler(e)) return;
            if (copyPasteShortcutHandler(e)) return;
            if (deleteShortcutHandler(e)) return;
            toolShortcutHandler(e, lastActivatedToolRef);
        };

        const handleKeyUp = () => revertTool(lastActivatedToolRef);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
};
