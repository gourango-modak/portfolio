import { useToolbarStore } from "../store/useToolbarStore";
import { SETTINGS_PANEL_TARGETS } from "./settings/settingsUtils";
import { TOOL_ACTION_TYPES } from "./toolbarConfig";

export const toolActionHandlers = {
    [TOOL_ACTION_TYPES.SELECT_TOOL]: ({ name }) => {
        useToolbarStore.getState().setActiveTool(name);
    },
    [TOOL_ACTION_TYPES.OPEN_CANVAS_SETTINGS]: () => {
        useToolbarStore
            .getState()
            .openSettingsPanel(SETTINGS_PANEL_TARGETS.CANVAS);
    },
};
