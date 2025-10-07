import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/registry";
import { commandHistorySlice, toolbarSlice } from "../store/utils";
import { TOOLS } from "../tools/constants";

export const useToolShortcuts = () => {
    const lastActivatedToolRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // If the key event originated from an input, skip shortcut handling
            // so that normal typing, pasting, and editing still work.
            const tag = e.target.tagName;
            if (tag === "INPUT") return;

            const { activeTool, setActiveTool } = toolbarSlice.getSlice();
            const { undo, redo } = commandHistorySlice.getSlice();

            // 🔄 Undo / Redo shortcuts
            if (e.ctrlKey) {
                if (e.key.toLowerCase() === "z") {
                    e.preventDefault();
                    if (e.shiftKey) {
                        // Ctrl + Shift + Z → Redo
                        redo();
                    } else {
                        // Ctrl + Z → Undo
                        undo();
                    }
                    return;
                }

                if (e.key.toLowerCase() === "y") {
                    // Ctrl + Y → Redo (alternate)
                    e.preventDefault();
                    redo();
                    return;
                }
            }

            if (activeTool === TOOLS.TEXT) return;

            for (const toolName in toolRegistry) {
                const tool = toolRegistry[toolName];
                if (!tool.shortcut) continue;
                const sc = tool.shortcut;

                if (sc.ctrl && !e.ctrlKey) continue; // only Ctrl needed
                if (sc.shift && !e.shiftKey) continue;
                if (sc.alt && !e.altKey) continue;

                // if no key specified, it’s a “modifier-only” shortcut
                if (sc.code && e.code !== sc.code) continue;

                e.preventDefault();

                // Activate tool only if not already selected
                if (activeTool !== tool.name) {
                    lastActivatedToolRef.current = activeTool;
                    setActiveTool(tool.name);
                }

                break;
            }
        };

        const handleKeyUp = (e) => {
            const { activeTool, setActiveTool } = toolbarSlice.getSlice();

            const tool = toolRegistry[activeTool];
            if (tool?.revertOnRelease) {
                if (lastActivatedToolRef.current) {
                    setActiveTool(lastActivatedToolRef.current);
                    lastActivatedToolRef.current = null;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
};
