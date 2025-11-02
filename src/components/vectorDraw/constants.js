import { Command, Copy, Infinity } from "lucide-react";

export const CANVAS_MODES = {
    PAGED: "Paged",
    INFINITE: "Infinite",
    SHORTCUTS: "Shortcuts",
};

export const CANVAS_MODE_SHORTCUTS = [
    {
        mode: CANVAS_MODES.SHORTCUTS,
        keys: new Set(["ControlLeft", "Period"]), // Ctrl + .
    },
    // Add more canvas mode shortcuts here:
    // { mode: CANVAS_MODES.PAGED, keys: new Set(["ShiftLeft", "KeyP"]) },
];

export const CANVAS_MODE_ICONS = {
    [CANVAS_MODES.PAGED]: Copy,
    [CANVAS_MODES.INFINITE]: Infinity,
    [CANVAS_MODES.SHORTCUTS]: Command,
};

export const PANELS = {
    INSPECTOR_PANEL: "inspectorPanel",
    TOOL_PROPERTIES_PANEL: "toolPropertiesPanel",
    TOOLBAR_PANEL: "toolbarPanel",
    EXPORT_PANEL: "exportPanel",
};

// 300% scale for high resolution export image
export const DPI_SCALE = 3;
