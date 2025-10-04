import { ColorProperty } from "./ColorProperty";
import { NumberProperty } from "./NumberProperty";
import { SliderProperty } from "./SliderProperty";

export const TOOL_PROPERTIES_COMPONENTS = {
    color: ColorProperty,
    numeric: NumberProperty,
    slider: SliderProperty,
};

export const INSPECTOR_PANEL_TARGETS = {
    CANVAS: "canvas",
    PAGE: "page",
};
