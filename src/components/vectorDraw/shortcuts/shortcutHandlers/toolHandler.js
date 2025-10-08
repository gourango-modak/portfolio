import { toolbarSlice } from "../../store/utils";
import { TOOLS } from "../../tools/constants";
import { toolRegistry } from "../../tools/registry";
import { doesShortcutMatch } from "../utils";

export const toolShortcutHandler = (e, lastActivatedToolRef) => {
    const { activeTool, setActiveTool } = toolbarSlice.getSlice();
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
        break;
    }
};
