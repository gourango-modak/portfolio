import { create } from "zustand";
import { zustandHmrFix } from "./zustandHmrFix";
import { usePanelStore } from "./usePanelStore";
import { TOOLS_PROPERTIES_PANEL_DISABLED } from "../toolbar/toolbarUtils";

export const useToolbarStore = create((set) => ({
    activeTool: "SELECT",
    setActiveTool: (toolName) =>
        set(() => {
            if (TOOLS_PROPERTIES_PANEL_DISABLED.includes(toolName))
                usePanelStore.getState().closeToolPropertiesPanel();
            else {
                usePanelStore.getState().openToolPropertiesPanel();
            }

            return {
                activeTool: toolName,
            };
        }),

    activeToolInstance: null,
    setActiveToolInstance: (instance) => set({ activeToolInstance: instance }),

    activeGroup: null,
    setActiveGroup: (groupName) => set({ activeGroup: groupName }),
    groupSelections: {}, // { [groupName]: subtoolName }
    setGroupSelection: (group, subtool) =>
        set((state) => ({
            groupSelections: {
                ...state.groupSelections,
                [group]: subtool,
            },
        })),

    toolProperties: {},
    updateToolProperties: (toolName, key, property) =>
        set((state) => ({
            toolProperties: {
                ...state.toolProperties,
                [toolName]: {
                    ...(state.toolProperties[toolName] || {}),
                    [key]: {
                        ...property,
                    },
                },
            },
        })),
}));

// Keeps Zustand state across hot reloads in dev (ignored in production)
zustandHmrFix("toolbarStorexxx", useToolbarStore);
