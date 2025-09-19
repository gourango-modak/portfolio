import { create } from "zustand";
import { arrowTool } from "./../tools/arrowTool";
import { ORIENTATION } from "../../../utils/common";

export const useToolbarStore = create((set, get) => ({
    activeTool: arrowTool.name,
    position: { x: 20, y: 20 },
    orientation: ORIENTATION.HORIZONTAL,

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

    toolSettings: {
        rectangle: {
            strokeColor: "#000",
            strokeWidth: 2,
            fillColor: "transparent",
        },
        ellipse: {
            strokeColor: "#000",
            strokeWidth: 2,
            fillColor: "transparent",
        },
    },
    userSettings: {},

    setActiveTool: (toolId) => set({ activeTool: toolId }),
    setPosition: ({ x, y }) => set({ position: { x, y } }),
    setVisibility: (toolId, visible) =>
        set((state) => ({
            tools: state.tools.map((t) =>
                t.id === toolId ? { ...t, visible: visible } : t
            ),
        })),
    updateUserSettings: (toolId, settings) =>
        set((state) => ({
            userSettings: {
                ...state.userSettings,
                [toolId]: {
                    ...state.userSettings[toolId],
                    ...settings,
                },
            },
        })),
}));
