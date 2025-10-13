import { ORIENTATION } from "../../../utils/common";
import { CANVAS_MODES, PANELS } from "../constants";
import { frameSlice } from "../store/utils";

export const getToolbarPanelInitialPosition = ({ orientation }) => {
    const panel = document.getElementById(PANELS.TOOLBAR_PANEL);
    if (!panel) return { x: 0, y: 0 };

    const rect = panel.getBoundingClientRect();
    let x = 0,
        y = 0;

    if (orientation === ORIENTATION.HORIZONTAL) {
        x = (window.innerWidth - rect.width) / 2;
        y = window.innerHeight - rect.height - 40;
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

export const isPagedCanvas = ({ canvasMode }) =>
    canvasMode === CANVAS_MODES.PAGED;

export const isInfiniteCanvas = ({ canvasMode }) =>
    canvasMode === CANVAS_MODES.INFINITE;

export const canGoPrevFrame = ({ activeFrameId }) =>
    frameSlice.getSlice().hasPrevFrame(activeFrameId);

export const canGoNextFrame = ({ activeFrameId }) =>
    frameSlice.getSlice().hasNextFrame(activeFrameId);

export const hasFrame = () => frameSlice.getSlice().hasFrame();
