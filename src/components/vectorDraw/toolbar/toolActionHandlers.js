import { useToolbarStore } from "../store/useToolbarStore";
import { INSPECTOR_PANEL_TARGETS } from "./properties/propertiesUtils";
import { TOOL_ACTION_TYPES } from "./toolbarConfig";

export const toolActionHandlers = {
    [TOOL_ACTION_TYPES.SELECT_TOOL]: ({ name }) => {
        useToolbarStore.getState().setActiveTool(name);
    },
    [TOOL_ACTION_TYPES.OPEN_CANVAS_SETTINGS]: () => {
        useToolbarStore
            .getState()
            .openInspectorPanel(INSPECTOR_PANEL_TARGETS.CANVAS);
    },
    [TOOL_ACTION_TYPES.ADD_FRAME]: () => {
        // useToolbarStore
        //     .getState()
        //     .openSettingsPanel(SETTINGS_PANEL_TARGETS.PAGE);
    },
};
