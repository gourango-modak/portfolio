import { create } from "zustand";
import { ORIENTATION } from "../../../utils/common";
import { PANELS } from "../canvasUtils";

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
    stack: [
        PANELS.INSPECTOR_PANEL,
        PANELS.TOOL_PROPERTIES_PANEL,
        PANELS.TOOLBAR_PANEL,
    ],
    zIndexMap: {
        [PANELS.INSPECTOR_PANEL]: 50,
        [PANELS.TOOL_PROPERTIES_PANEL]: 51,
        [PANELS.TOOLBAR_PANEL]: 52,
    },

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

    bringToFront: (panelId) => {
        set((state) => {
            const stack = [...state.stack];
            const zIndexMap = { ...state.zIndexMap };

            const index = stack.indexOf(panelId);
            if (index === -1) return state;

            const prevTop = stack[stack.length - 1];
            if (prevTop === panelId) return state; // already top

            // Remove clicked panel and push to top
            stack.splice(index, 1);
            stack.push(panelId);

            // New top z-index = current top z-index + 1
            const maxZ = Math.max(...Object.values(zIndexMap));
            zIndexMap[panelId] = maxZ + 1;

            return { stack, zIndexMap };
        });
    },

    getZIndex: (panelId) => {
        const stack = get().stack;
        const index = stack.indexOf(panelId);
        return index === -1 ? get().baseZ : get().baseZ + index;
    },
}));
