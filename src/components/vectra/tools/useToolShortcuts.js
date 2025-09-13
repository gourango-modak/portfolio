import { useEffect, useRef } from "react";
import { useDrawingStore } from "../store/DrawingStoreContext";

export const useToolShortcuts = () => {
    const { selectedTool, setSelectedTool, toolRegistry } = useDrawingStore();
    const lastSelectedToolRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedTool === "text") return;

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
                if (selectedTool !== tool.name) {
                    lastSelectedToolRef.current = selectedTool;
                    setSelectedTool(tool.name);
                }

                break;
            }
        };

        const handleKeyUp = (e) => {
            const tool = toolRegistry[selectedTool];
            if (tool?.revertOnRelease) {
                if (lastSelectedToolRef.current) {
                    setSelectedTool(lastSelectedToolRef.current);
                    lastSelectedToolRef.current = null;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [toolRegistry, selectedTool, setSelectedTool]);
};
