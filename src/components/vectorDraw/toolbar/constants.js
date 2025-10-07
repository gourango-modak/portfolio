import { PANELS } from "../constants";
import { TOOLS } from "../tools/constants";
import {
    getInspectorPanelInitialPosition,
    getToolbarPanelInitialPosition,
    getToolPropertiesPanelInitialPosition,
} from "./utils";

export const PANEL_INIT_POSITION_FUNCTIONS = {
    [PANELS.TOOLBAR_PANEL]: getToolbarPanelInitialPosition,
    [PANELS.INSPECTOR_PANEL]: getInspectorPanelInitialPosition,
    [PANELS.TOOL_PROPERTIES_PANEL]: getToolPropertiesPanelInitialPosition,
};

export const TOOLS_PROPERTIES_PANEL_DISABLED = [TOOLS.SELECTION, TOOLS.PAN];
