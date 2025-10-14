import { ColorProperty } from "./ColorProperty";
import { InputProperty } from "./InputProperty";

export const TOOL_PROPERTIES = {
    COLOR: "color",
    STROKE_WIDTH: "strokeWidth",
    ROUGHNESS: "roughness",
    FONT_SIZE: "fontSize",
    FONT_FAMILY: "fontFamily",
    STREAMLINE: "streamline",
    THINNING: "thinning",
    SMOOTHING: "smoothing",
    DURATION: "duration",
    BORDER_COLOR: "borderColor",
    BG_COLOR: "bgColor",
    SIZE: "size",
    HEAD_LENGTH: "headLength",
    HEAD_ANGLE: "headAngle",
    WIDTH: "width",
    HEIGHT: "height",
};

export const TOOL_PROPERTIES_COMPONENTS = {
    [TOOL_PROPERTIES.COLOR]: ColorProperty,
    [TOOL_PROPERTIES.BG_COLOR]: ColorProperty,
    [TOOL_PROPERTIES.STROKE_WIDTH]: InputProperty,
    [TOOL_PROPERTIES.WIDTH]: InputProperty,
    [TOOL_PROPERTIES.HEIGHT]: InputProperty,
    [TOOL_PROPERTIES.SIZE]: InputProperty,
};

export const INSPECTOR_PANEL_TARGETS = {
    CANVAS: "canvas",
    PAGE: "page",
};
