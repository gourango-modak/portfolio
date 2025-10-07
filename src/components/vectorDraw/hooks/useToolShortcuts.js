import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/registry";
import { commandHistorySlice, toolbarSlice } from "../store/utils";
import { TOOLS } from "../tools/constants";

export const useToolShortcuts = () => {
    const lastActivatedToolRef = useRef(null);

    // Helper: Check if the event target is an input field
    const isTypingInInput = (e) => {
        const tag = e.target.tagName;
        return tag === "INPUT" || tag === "TEXTAREA";
    };

    // Helper: Handle undo/redo shortcuts
    const handleUndoRedo = (e) => {
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

    // Helper: Check if a tool shortcut matches the key event
    const doesShortcutMatch = (shortcut, event) => {
        if (shortcut.ctrl && !event.ctrlKey) return false;
        if (shortcut.shift && !event.shiftKey) return false;
        if (shortcut.alt && !event.altKey) return false;
        if (shortcut.code && event.code !== shortcut.code) return false;
        return true;
    };

    // Handle activating tools via shortcuts
    const handleToolShortcut = (e) => {
        const { activeTool, setActiveTool } = toolbarSlice.getSlice();

        // Skip if the current tool is TEXT (no shortcuts allowed)
        if (activeTool === TOOLS.TEXT) return;

        for (const toolName in toolRegistry) {
            const tool = toolRegistry[toolName];
            if (!tool.shortcut) continue;

            if (!doesShortcutMatch(tool.shortcut, e)) continue;

            e.preventDefault();

            if (activeTool !== tool.name) {
                lastActivatedToolRef.current = activeTool;
                setActiveTool(tool.name);
            }

            break; // Stop after activating one tool
        }
    };

    // Handle reverting tools on key release
    const handleRevertTool = () => {
        const { activeTool, setActiveTool } = toolbarSlice.getSlice();
        const tool = toolRegistry[activeTool];

        if (tool?.revertOnRelease && lastActivatedToolRef.current) {
            setActiveTool(lastActivatedToolRef.current);
            lastActivatedToolRef.current = null;
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isTypingInInput(e)) return;
            if (handleUndoRedo(e)) return;
            handleToolShortcut(e);
        };

        const handleKeyUp = () => handleRevertTool();

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
};
