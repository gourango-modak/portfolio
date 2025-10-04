import { ColorProperty } from "./ColorProperty";
import { NumberProperty } from "./NumberProperty";

export const TOOL_PROPERTIES_COMPONENTS = {
    strokeColor: ColorProperty,
    fillColor: ColorProperty,
    strokeWidth: NumberProperty,
};

export const INSPECTOR_PANEL_TARGETS = {
    CANVAS: "canvas",
    PAGE: "page",
};
