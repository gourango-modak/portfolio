import { ColorSetting } from "./ColorSetting";
import { NumberSetting } from "./NumberSetting";
import { CheckboxSetting } from "./CheckboxSetting";
import { CANVAS_MODES } from "../../svgCanvasUtils";

// Example mapping
export const TOOL_SETTINGS_COMPONENTS = {
    strokeColor: ColorSetting,
    fillColor: ColorSetting,
    strokeWidth: NumberSetting,
    opacity: NumberSetting,
    isDashed: CheckboxSetting,
    // Add more mappings as needed
};

export const CANVAS_MODE_OPTIONS = [
    { label: CANVAS_MODES.INFINITE, value: CANVAS_MODES.INFINITE },
    { label: CANVAS_MODES.SINGLE_FRAME, value: CANVAS_MODES.SINGLE_FRAME },
    { label: CANVAS_MODES.MULTI_FRAME, value: CANVAS_MODES.MULTI_FRAME },
    { label: CANVAS_MODES.PAGED_FRAME, value: CANVAS_MODES.PAGED_FRAME },
];

export const SETTINGS_PANEL_TARGETS = {
    TOOL: "toolSettings",
    CANVAS: "canvasSettings",
};
