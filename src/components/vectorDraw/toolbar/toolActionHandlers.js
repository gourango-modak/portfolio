import { useCanvasStore } from "../store/useCanvasStore";
import { usePanelStore } from "../store/usePanelStore";
import { useToolbarStore } from "../store/useToolbarStore";
import { INSPECTOR_PANEL_TARGETS } from "./properties/propertiesUtils";
import { TOOL_ACTION_TYPES } from "./toolbarConfig";

export const toolActionHandlers = {
    [TOOL_ACTION_TYPES.SELECT_TOOL]: ({ name }) => {
        useToolbarStore.getState().setActiveTool(name);
    },
    [TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL]: () => {
        usePanelStore
            .getState()
            .openInspectorPanel(INSPECTOR_PANEL_TARGETS.CANVAS);
    },
    [TOOL_ACTION_TYPES.ADD_PAGE]: () => {
        useCanvasStore.getState().addFrame();
    },
    [TOOL_ACTION_TYPES.PREV_PAGE]: () => {
        useCanvasStore.getState().prevFrame();
    },
    [TOOL_ACTION_TYPES.NEXT_PAGE]: () => {
        useCanvasStore.getState().nextFrame();
    },
};
