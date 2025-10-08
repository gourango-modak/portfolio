import { toolbarSlice } from "../store/utils";
import { toolRegistry } from "../tools/registry";

export const isTypingInInput = (e) => {
    const tag = e.target.tagName;
    return tag === "INPUT" || tag === "TEXTAREA";
};

export const doesShortcutMatch = (shortcut, event) => {
    if (shortcut.ctrl && !event.ctrlKey) return false;
    if (shortcut.shift && !event.shiftKey) return false;
    if (shortcut.alt && !event.altKey) return false;
    if (shortcut.code && event.code !== shortcut.code) return false;
    return true;
};

export const revertTool = (lastActivatedToolRef) => {
    const { activeTool, setActiveTool } = toolbarSlice.getSlice();
    const tool = toolRegistry[activeTool];
    if (tool?.revertOnRelease && lastActivatedToolRef.current) {
        setActiveTool(lastActivatedToolRef.current);
        lastActivatedToolRef.current = null;
    }
};
