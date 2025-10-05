import { Copy, Infinity } from "lucide-react";
import { shapeBoundingRectRegistry } from "./shapes/shapeBoundingRectRegistry";
import { shapeHitTestRegistry } from "./shapes/shapeHitTestRegistry";

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

export const getRoughRectPath = (x, y, w, h, roughness = 0) => {
    const jitter = (v) => v + (Math.random() - 0.5) * roughness;

    const makePath = () => {
        const x1 = jitter(x),
            y1 = jitter(y);
        const x2 = jitter(x + w),
            y2 = jitter(y);
        const x3 = jitter(x + w),
            y3 = jitter(y + h);
        const x4 = jitter(x),
            y4 = jitter(y + h);
        return `M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z`;
    };

    return roughness > 0
        ? `${makePath()} ${makePath()}`
        : `M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`;
};

export const getShapeBoundingRect = (shape) => {
    const getBoundingRectFn = shapeBoundingRectRegistry[shape.type];
    return getBoundingRectFn(shape);
};

export const computeSelectedShapesBounds = (selectedShapeIds, shapes) => {
    if (selectedShapeIds.size <= 0) return null;

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    selectedShapeIds.forEach((id) => {
        const shape = shapes[id];
        if (!shape) return;

        const { x, y, width, height } = getShapeBoundingRect(shape);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    });

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};

export const findShapeAtPoint = (shape, { x, y }) => {
    const hitTestFn = shapeHitTestRegistry[shape.type];
    return hitTestFn && hitTestFn(shape, x, y);
};
