import { frameSlice, panelSlice, toolbarSlice } from "../store/storeUtils";
import { INSPECTOR_PANEL_TARGETS } from "./properties/propertiesUtils";
import { TOOL_ACTION_TYPES } from "./toolbarConfig";

export const toolActionHandlers = {
    [TOOL_ACTION_TYPES.SELECT_TOOL]: ({ name }) => {
        toolbarSlice.getSlice().setActiveTool(name);
    },
    [TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL]: () => {
        panelSlice
            .getSlice()
            .openInspectorPanel(INSPECTOR_PANEL_TARGETS.CANVAS);
    },
    [TOOL_ACTION_TYPES.ADD_PAGE]: () => {
        frameSlice.getSlice().addFrame();
    },
    [TOOL_ACTION_TYPES.PREV_PAGE]: () => {
        frameSlice.getSlice().prevFrame();
    },
    [TOOL_ACTION_TYPES.NEXT_PAGE]: () => {
        frameSlice.getSlice().nextFrame();
    },
};
