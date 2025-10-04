import { useEffect, useRef } from "react";
import { useToolbarStore } from "../store/useToolbarStore";
import { toolRegistry } from "../tools/toolRegistry";

export const useToolShortcuts = () => {
    const lastActivatedToolRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const activeTool = useToolbarStore.getState().activeTool;

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
                    useToolbarStore.getState().setActiveTool(tool.name);
                }

                break;
            }
        };

        const handleKeyUp = (e) => {
            const activeTool = useToolbarStore.getState().activeTool;

            const tool = toolRegistry[activeTool];
            if (tool?.revertOnRelease) {
                if (lastActivatedToolRef.current) {
                    useToolbarStore
                        .getState()
                        .setActiveTool(lastActivatedToolRef.current);
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
