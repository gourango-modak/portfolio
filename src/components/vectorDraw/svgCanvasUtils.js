import { toolRegistry } from "./tools/toolRegistry";
import { Square, Grid, Copy, Infinity } from "lucide-react";

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

export const getMergedToolSettings = (userToolSettings, activeTool) => {
    const tool = toolRegistry[activeTool];
    if (!tool.defaultSettings) return null;
    return {
        ...tool.defaultSettings,
        ...userToolSettings,
    };
};

export const CANVAS_MODES = {
    SINGLE_FRAME: "Single Frame",
    MULTI_FRAME: "Multiple Frame",
    PAGED_FRAME: "Paged Frame",
    INFINITE: "Infinite",
};

export const CANVAS_MODE_ICONS = {
    [CANVAS_MODES.SINGLE_FRAME]: Square,
    [CANVAS_MODES.MULTI_FRAME]: Grid,
    [CANVAS_MODES.PAGED_FRAME]: Copy,
    [CANVAS_MODES.INFINITE]: Infinity,
};

export const FRAME_CANVAS_MODES = [
    CANVAS_MODES.SINGLE_FRAME,
    CANVAS_MODES.MULTI_FRAME,
    CANVAS_MODES.PAGED_FRAME,
];
