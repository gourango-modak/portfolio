import { create } from "zustand";
import { zustandHmrFix } from "./zustandHmrFix";
// import { toolRegistry } from "../tools/toolRegistry";

// const initializeToolProperties = () => {
//     console.log(toolRegistry);
//     return Object.fromEntries(
//         Object.keys(toolRegistry).map((name) => [name, {}])
//     );
// };

export const useToolbarStore = create((set) => ({
    activeTool: "PEN",
    setActiveTool: (toolName) => set({ activeTool: toolName }),

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

    // toolProperties: initializeToolProperties(),
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
