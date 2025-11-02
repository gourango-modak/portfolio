import { TOOLS } from "../../tools/constants";
import { TOOLS_PROPERTIES_PANEL_DISABLED } from "./../../toolbar/constants";

export const createToolbarSlice = (set, get) => ({
    toolbarSlice: {
        activeTool: TOOLS.SELECTION,
        activeToolInstance: null,
        activeGroup: null,
        groupSelections: {}, // { [groupName]: subtoolName }
        toolProperties: {},

        setActiveTool: (toolName) =>
            set(() => {
                const { closeToolPropertiesPanel, openToolPropertiesPanel } =
                    get().panelSlice;
                const { activeGroup, setActiveGroup } = get().toolbarSlice;

                // Manage tool properties panel visibility
                if (TOOLS_PROPERTIES_PANEL_DISABLED.includes(toolName)) {
                    closeToolPropertiesPanel();
                } else {
                    openToolPropertiesPanel();
                }

                // Deselect shapes if any are selected
                if (get().shapeSlice.selectedShapeIds.size > 0) {
                    get().shapeSlice.deselectAll();
                }

                // Deselect frames if any are selected
                if (get().frameSlice.selectedFrameIds.size > 0) {
                    get().frameSlice.deselectAll();
                }

                // Deselect the last selected object
                get().canvasObjectSlice.deselectAll();

                // Close secondary toolbar if opened
                if (activeGroup) {
                    setActiveGroup(null);
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
