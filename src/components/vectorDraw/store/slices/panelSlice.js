import { ORIENTATION } from "../../../../utils/common";
import { PANELS } from "../../constants";

export const createPanelSlice = (set, get) => ({
    panelSlice: {
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
            [PANELS.EXPORT_PANEL]: {
                isVisible: false,
                position: { x: 90, y: 100 },
                orientation: ORIENTATION.HORIZONTAL,
            },
        },
        stack: [
            PANELS.INSPECTOR_PANEL,
            PANELS.TOOL_PROPERTIES_PANEL,
            PANELS.TOOLBAR_PANEL,
            PANELS.EXPORT_PANEL,
        ],
        zIndexMap: {
            [PANELS.INSPECTOR_PANEL]: 10,
            [PANELS.TOOL_PROPERTIES_PANEL]: 11,
            [PANELS.TOOLBAR_PANEL]: 12,
            [PANELS.EXPORT_PANEL]: 13,
        },

        openToolbarPanel: () =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [PANELS.TOOLBAR_PANEL]: {
                            ...state.panelSlice.panels[PANELS.TOOLBAR_PANEL],
                            isVisible: true,
                        },
                    },
                },
            })),

        openInspectorPanel: (target) =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [PANELS.INSPECTOR_PANEL]: {
                            ...state.panelSlice.panels[PANELS.INSPECTOR_PANEL],
                            isVisible: true,
                            target,
                        },
                    },
                },
            })),

        closeInspectorPanel: () =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [PANELS.INSPECTOR_PANEL]: {
                            ...state.panelSlice.panels[PANELS.INSPECTOR_PANEL],
                            isVisible: false,
                        },
                    },
                },
            })),

        openToolPropertiesPanel: () =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [PANELS.TOOL_PROPERTIES_PANEL]: {
                            ...state.panelSlice.panels[
                                PANELS.TOOL_PROPERTIES_PANEL
                            ],
                            isVisible: true,
                        },
                    },
                },
            })),

        closeToolPropertiesPanel: () =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [PANELS.TOOL_PROPERTIES_PANEL]: {
                            ...state.panelSlice.panels[
                                PANELS.TOOL_PROPERTIES_PANEL
                            ],
                            isVisible: false,
                        },
                    },
                },
            })),

        openExportPanel: () =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [PANELS.EXPORT_PANEL]: {
                            ...state.panelSlice.panels[PANELS.EXPORT_PANEL],
                            isVisible: true,
                        },
                    },
                },
            })),

        closeExportPanel: () =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [PANELS.EXPORT_PANEL]: {
                            ...state.panelSlice.panels[PANELS.EXPORT_PANEL],
                            isVisible: false,
                        },
                    },
                },
            })),

        setPosition: (panelId, position) =>
            set((state) => ({
                panelSlice: {
                    ...state.panelSlice,
                    panels: {
                        ...state.panelSlice.panels,
                        [panelId]: {
                            ...state.panelSlice.panels[panelId],
                            position: { ...position },
                        },
                    },
                },
            })),

        bringToFront: (panelId) => {
            set((state) => {
                const stack = [...state.panelSlice.stack];
                const zIndexMap = { ...state.panelSlice.zIndexMap };

                const index = stack.indexOf(panelId);
                if (index === -1) return state.panelSlice;

                const prevTop = stack[stack.length - 1];
                if (prevTop === panelId) return state.panelSlice; // already top

                // Remove clicked panel and push to top
                stack.splice(index, 1);
                stack.push(panelId);

                // New top z-index = current top z-index + 1
                const maxZ = Math.max(...Object.values(zIndexMap));
                zIndexMap[panelId] = maxZ + 1;

                return {
                    panelSlice: { ...state.panelSlice, stack, zIndexMap },
                };
            });
        },
    },
});
