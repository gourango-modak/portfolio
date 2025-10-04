import { ORIENTATION } from "../../../utils/common";
import { PANELS } from "../canvasUtils";

export const getToolbarPanelInitialPosition = ({ orientation }) => {
    const panel = document.getElementById(PANELS.TOOLBAR_PANEL);
    if (!panel) return { x: 0, y: 0 };

    const rect = panel.getBoundingClientRect();
    let x = 0,
        y = 0;

    if (orientation === ORIENTATION.HORIZONTAL) {
        x = (window.innerWidth - rect.width) / 2;
        y = window.innerHeight - rect.height - 64;
    } else {
        x = 40;
        y = (window.innerHeight - rect.height) / 2;
    }

    return { x, y };
};

export const getInspectorPanelInitialPosition = () => {
    return { x: 20, y: 50 };
};

export const getToolPropertiesPanelInitialPosition = () => {
    return { x: 20, y: 300 };
};

export const PANEL_INIT_POSITION_FUNCTIONS = {
    [PANELS.TOOLBAR_PANEL]: getToolbarPanelInitialPosition,
    [PANELS.INSPECTOR_PANEL]: getInspectorPanelInitialPosition,
    [PANELS.TOOL_PROPERTIES_PANEL]: getToolPropertiesPanelInitialPosition,
};
