import { toolRegistry } from "./tools/toolRegistry";
import { Copy, Infinity } from "lucide-react";

export const isTargetInside = (target, container) => {
    return container?.contains(target) ?? false;
};

export const getSvgCanvasPointerEvent = (svgCanvasRef, e) => {
    const svg = svgCanvasRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const coords = pt.matrixTransform(svg.getScreenCTM().inverse());
    return {
        x: coords.x,
        y: coords.y,
        originalEvent: e,
    };
};

export const getToolProperties = (userToolProperties, activeTool) => {
    const tool = toolRegistry[activeTool];
    if (!tool.defaultProperties) return null;
    return {
        ...tool.defaultProperties,
        ...userToolProperties,
    };
};

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
};
