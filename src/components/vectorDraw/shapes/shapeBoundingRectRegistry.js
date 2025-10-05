import { SHAPES } from "./shapesUtils";

function getRectShapeBounds(shape) {
    const { x, y, width, height } = shape;
    return { x, y, width, height };
}

export const getPenShapeBounds = (shape) => {
    const xs = shape.points.map((p) => p.x);
    const ys = shape.points.map((p) => p.y);

    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    // Local bounds
    const width = maxX - minX;
    const height = maxY - minY;

    // Convert to global bounds
    return {
        x: shape.x + minX,
        y: shape.y + minY,
        width,
        height,
    };
};

export function getArrowShapeBounds(shape) {
    const pts = shape.points;
    if (!pts || !pts.length)
        return { x: shape.x, y: shape.y, width: 0, height: 0 };

    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
        x: shape.x + minX,
        y: shape.y + minY,
        width: maxX - minX,
        height: maxY - minY,
    };
}

let _measureCanvas = null;
let _measureCtx = null;

export const getTextShapeBounds = (shape) => {
    const { x, y, text, properties } = shape;
    const { fontSize, fontFamily } = properties;

    // Create the shared offscreen canvas only once
    if (!_measureCanvas) {
        _measureCanvas = document.createElement("canvas");
        _measureCtx = _measureCanvas.getContext("2d");
    }

    const ctx = _measureCtx;
    ctx.font = `${fontSize.value}px ${fontFamily.value}`;

    const metrics = ctx.measureText(text);

    const width = metrics.width;
    const ascent = metrics.actualBoundingBoxAscent;
    const descent = metrics.actualBoundingBoxDescent;
    const height = ascent + descent;

    // Adjust Y to top-left corner (SVG text is baseline-aligned)
    const adjustedY = y - ascent;

    return {
        x,
        y: adjustedY,
        width,
        height,
    };
};

// Registry of all shape bounding rectangle functions
export const shapeBoundingRectRegistry = {
    [SHAPES.PEN]: getPenShapeBounds,
    [SHAPES.RECTANGLE]: getRectShapeBounds,
    [SHAPES.ARROW]: getArrowShapeBounds,
    [SHAPES.TEXT]: getTextShapeBounds,
};
