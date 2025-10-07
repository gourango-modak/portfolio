import { panelSlice } from "../utils";

export const usePanelVisible = (panelId) =>
    panelSlice.useSliceProperty((s) => s.panels[panelId]?.isVisible);

export const usePanelOrientation = (panelId) =>
    panelSlice.useSliceProperty((s) => s.panels[panelId]?.orientation);

export const usePanelZIndex = (panelId) =>
    panelSlice.useSliceProperty((s) => s.zIndexMap[panelId]);

export const usePanelTarget = (panelId) =>
    panelSlice.useSliceProperty((s) => s.panels[panelId]?.target);
