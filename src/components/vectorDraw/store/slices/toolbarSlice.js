import { TOOLS_PROPERTIES_PANEL_DISABLED } from "../../toolbar/toolbarUtils";
import { TOOLS } from "../../tools/toolsUtils";

export const createToolbarSlice = (set, get) => ({
    toolbarSlice: {
        activeTool: TOOLS.SELECTION,
        activeToolInstance: null,
        activeGroup: null,
        groupSelections: {}, // { [groupName]: subtoolName }
        toolProperties: {},

        setActiveTool: (toolName) =>
            set(() => {
                const panelSlice = get().panelSlice;
                const shapeSlice = get().shapeSlice;
                const textOverlaySlice = get().textOverlaySlice;

                // Manage tool properties panel visibility
                if (TOOLS_PROPERTIES_PANEL_DISABLED.includes(toolName)) {
                    panelSlice.closeToolPropertiesPanel();
                } else {
                    panelSlice.openToolPropertiesPanel();
                }

                // Deselect shapes if any are selected
                if (shapeSlice.selectedShapeIds.size > 0) {
                    shapeSlice.deselectAll();
                }

                // Close text overlay if active tool is not TEXT
                if (toolName !== TOOLS.TEXT) {
                    textOverlaySlice.close();
                }

                return {
                    toolbarSlice: {
                        ...get().toolbarSlice,
                        activeTool: toolName,
                    },
                };
            }),

        setActiveToolInstance: (instance) =>
            set((state) => ({
                toolbarSlice: {
                    ...state.toolbarSlice,
                    activeToolInstance: instance,
                },
            })),

        setActiveGroup: (groupName) =>
            set((state) => ({
                toolbarSlice: { ...state.toolbarSlice, activeGroup: groupName },
            })),

        setGroupSelection: (group, subtool) =>
            set((state) => ({
                toolbarSlice: {
                    ...state.toolbarSlice,
                    groupSelections: {
                        ...state.toolbarSlice.groupSelections,
                        [group]: subtool,
                    },
                },
            })),

        updateToolProperties: (toolName, key, property) =>
            set((state) => ({
                toolbarSlice: {
                    ...state.toolbarSlice,
                    toolProperties: {
                        ...state.toolbarSlice.toolProperties,
                        [toolName]: {
                            ...(state.toolbarSlice.toolProperties[toolName] ||
                                {}),
                            [key]: { ...property },
                        },
                    },
                },
            })),

        serialize: () => {
            const { activeTool, activeGroup, groupSelections, toolProperties } =
                get().toolbarSlice;
            return {
                activeTool,
                activeGroup,
                groupSelections,
                toolProperties,
            };
        },

        deserialize: (data) => {
            if (!data) return;
            set((state) => ({
                toolbarSlice: {
                    ...state.toolbarSlice,
                    activeTool:
                        data.activeTool ?? state.toolbarSlice.activeTool,
                    activeGroup:
                        data.activeGroup ?? state.toolbarSlice.activeGroup,
                    groupSelections:
                        data.groupSelections ??
                        state.toolbarSlice.groupSelections,
                    toolProperties:
                        data.toolProperties ??
                        state.toolbarSlice.toolProperties,
                },
            }));
        },
    },
});
