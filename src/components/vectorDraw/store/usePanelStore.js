import { create } from "zustand";
import { ORIENTATION } from "../../../utils/common";
import { PANELS } from "../svgCanvasUtils";

export const usePanelStore = create((set, get) => ({
    panels: {
        [PANELS.INSPECTOR_PANEL]: {
            isVisible: false,
            position: { x: 100, y: 100 },
            target: null,
        },
        [PANELS.TOOL_PROPERTIES_PANEL]: {
            isVisible: false,
            position: { x: 50, y: 100 },
        },
        [PANELS.TOOLBAR_PANEL]: {
            isVisible: false,
            position: { x: 10, y: 100 },
            orientation: ORIENTATION.HORIZONTAL,
        },
    },
    stack: [], // z-index order
    baseZ: 50,

    openToolbarPanel: () =>
        set((s) => ({
            panels: {
                ...s.panels,
                [PANELS.TOOLBAR_PANEL]: {
                    ...s.panels[PANELS.TOOLBAR_PANEL],
                    isVisible: true,
                },
            },
        })),

    openInspectorPanel: (target) =>
        set((s) => ({
            panels: {
                ...s.panels,
                [PANELS.INSPECTOR_PANEL]: {
                    ...s.panels[PANELS.INSPECTOR_PANEL],
                    isVisible: true,
                    target,
                },
            },
        })),

    closeInspectorPanel: () =>
        set((s) => ({
            panels: {
                ...s.panels,
                [PANELS.INSPECTOR_PANEL]: {
                    ...s.panels[PANELS.INSPECTOR_PANEL],
                    isVisible: false,
                },
            },
        })),

    openToolPropertiesPanel: () =>
        set((s) => ({
            panels: {
                ...s.panels,
                [PANELS.TOOL_PROPERTIES_PANEL]: {
                    ...s.panels[PANELS.TOOL_PROPERTIES_PANEL],
                    isVisible: true,
                },
            },
        })),

    closeToolPropertiesPanel: () =>
        set((s) => ({
            panels: {
                ...s.panels,
                [PANELS.TOOL_PROPERTIES_PANEL]: {
                    ...s.panels[PANELS.TOOL_PROPERTIES_PANEL],
                    isVisible: false,
                },
            },
        })),

    setPosition: (panelId, position) =>
        set((s) => ({
            panels: {
                ...s.panels,
                [panelId]: { ...s.panels[panelId], position: { ...position } },
            },
        })),

    bringToFront: (panelId) =>
        set((s) => {
            const stack = [...s.stack.filter((id) => id !== panelId), panelId];
            return { stack };
        }),

    getZIndex: (panelId) => {
        const stack = get().stack;
        const index = stack.indexOf(panelId);
        return index === -1 ? get().baseZ : get().baseZ + index;
    },
}));
