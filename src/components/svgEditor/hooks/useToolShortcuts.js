import { useEffect } from "react";

/**
 * Hook to bind keyboard shortcuts for tools with Ctrl/Cmd requirement
 * @param {object} shortcuts - { key: toolName or callback }
 * @param {function} setTool - function to set the current tool
 */
export const useToolShortcuts = (shortcuts, setTool) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();

            // Check for Ctrl (or Cmd on Mac)
            if ((e.ctrlKey || e.metaKey) && shortcuts[key]) {
                const action = shortcuts[key];
                if (typeof action === "function") action();
                else setTool(action);

                e.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [shortcuts, setTool]);
};
