import { Copy, Infinity } from "lucide-react";

export const CANVAS_MODES = {
    PAGED: "Paged",
    INFINITE: "Infinite",
};

export const CANVAS_MODE_ICONS = {
    [CANVAS_MODES.PAGED]: Copy,
    [CANVAS_MODES.INFINITE]: Infinity,
};

export const PANELS = {
    INSPECTOR_PANEL: "inspectorPanel",
    TOOL_PROPERTIES_PANEL: "toolPropertiesPanel",
    TOOLBAR_PANEL: "toolbarPanel",
    EXPORT_PANEL: "exportPanel",
};

// 300% scale for high resolution export image
export const DPI_SCALE = 3;
