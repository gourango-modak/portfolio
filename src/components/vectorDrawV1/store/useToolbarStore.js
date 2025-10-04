import { create } from "zustand";
import { arrowTool } from "./../tools/arrowTool";
import { toolRegistry } from "../tools/toolRegistry";
import { zustandHmrFix } from "./zustandHmrFix";

const initializeUserToolProperties = () => {
    return Object.fromEntries(
        Object.keys(toolRegistry).map((name) => [name, {}])
    );
};

export const useToolbarStore = create((set) => ({
    activeTool: arrowTool.name,
    setActiveTool: (toolName) => set({ activeTool: toolName }),

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

    userToolProperties: initializeUserToolProperties(),
    updateUserToolSettings: (toolName, properties) =>
        set((state) => ({
            userToolProperties: {
                ...state.userToolProperties,
                [toolName]: {
                    ...state.userToolProperties[toolName],
                    ...properties,
                },
            },
        })),
}));

// Keeps Zustand state across hot reloads in dev (ignored in production)
zustandHmrFix("toolbarStore2d", useToolbarStore);
