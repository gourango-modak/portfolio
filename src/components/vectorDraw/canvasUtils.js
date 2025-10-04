import { Copy, Infinity } from "lucide-react";

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

export const getSvgPathFromStroke = (stroke) => {
    if (!stroke.length) return "";
    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ["M", ...stroke[0], "Q"]
    );
    d.push("Z");
    return d.join(" ");
};
