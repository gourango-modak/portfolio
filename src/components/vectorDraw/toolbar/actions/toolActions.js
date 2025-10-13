import { panelSlice, toolbarSlice } from "../../store/utils";
import { INSPECTOR_PANEL_TARGETS } from "../components/properties/constants";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const toolActions = {
    [TOOL_ACTION_TYPES.SELECT_TOOL]: ({ name }) => {
        toolbarSlice.getSlice().setActiveTool(name);
    },

    [TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL]: () => {
        panelSlice
            .getSlice()
            .openInspectorPanel(INSPECTOR_PANEL_TARGETS.CANVAS);
    },
};
