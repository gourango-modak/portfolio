import { ColorProperty } from "./ColorProperty";
import { InputProperty } from "./InputProperty";

export const PROPERTY_TYPES = {
    COLOR: "COLOR",
    NUMERIC: "NUMERIC",
};

export const TOOL_PROPERTIES_COMPONENTS = {
    [PROPERTY_TYPES.COLOR]: ColorProperty,
    [PROPERTY_TYPES.NUMERIC]: InputProperty,
};

export const INSPECTOR_PANEL_TARGETS = {
    CANVAS: "canvas",
    PAGE: "page",
};
