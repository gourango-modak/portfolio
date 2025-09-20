import { create } from "zustand";
import { arrowTool } from "./../tools/arrowTool";
import { ORIENTATION } from "../../../utils/common";
import { toolRegistry } from "../tools/toolRegistry";

const initializeUserToolSettings = () => {
    return Object.fromEntries(
        Object.keys(toolRegistry).map((name) => [name, {}])
    );
};

export const useToolbarStore = create((set) => ({
    activeTool: arrowTool.name,
    position: { x: 20, y: 20 },
    orientation: ORIENTATION.VERTICAL,
    visible: false,

    setActiveTool: (toolName) => set({ activeTool: toolName }),
    setPosition: ({ x, y }) => set({ position: { x, y } }),
    setVisibility: (visible) => set({ visible: visible }),

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

    settingsPanel: {
        isVisible: false,
        position: { x: 60, y: 100 }, // default starting position
        target: "",
    },
    closeSettingsPanel: () =>
        set((state) => ({
            settingsPanel: {
                ...state.settingsPanel,
                isVisible: false,
            },
        })),

    openSettingsPanel: (target) =>
        set((state) => {
            // If already open for the same target, do nothing
            if (
                state.settingsPanel.isVisible &&
                state.settingsPanel.target === target
            ) {
                return {};
            }

            return {
                settingsPanel: {
                    ...state.settingsPanel,
                    isVisible: true,
                    target: target,
                },
            };
        }),
    setSettingsPanelPosition: (position) =>
        set((state) => ({
            settingsPanel: {
                ...state.settingsPanel,
                position,
            },
        })),

    userToolSettings: initializeUserToolSettings(),
    updateUserToolSettings: (toolName, settings) =>
        set((state) => ({
            userSettings: {
                ...state.userSettings,
                [toolName]: {
                    ...state.userSettings[toolName],
                    ...settings,
                },
            },
        })),

    colorPicker: {
        isOpen: false,
        color: "#000000",
        anchorEl: null,
    },

    openColorPicker: (color, anchorEl) =>
        set({
            colorPicker: { isOpen: true, color, anchorEl },
        }),

    closeColorPicker: () =>
        set((state) => ({
            colorPicker: {
                ...state.colorPicker,
                isOpen: false,
                anchorEl: null,
            },
        })),
    setColorPickerColor: (color) =>
        set((state) => ({
            colorPicker: { ...state.colorPicker, color },
        })),
}));
