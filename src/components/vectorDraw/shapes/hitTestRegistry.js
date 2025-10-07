import {
    distancePointToSegment,
    isPointInPolygon,
} from "../utils/geometryUtils";
import { getTextShapeBounds } from "./boundingRectRegistry";
import { SHAPES } from "./constants";

// options: { type: "point" | "circle", radius?: number }
function hitTestPenShape(shape, x, y, options = { type: "point" }) {
    const rawPoints = shape.points;
    if (!rawPoints || rawPoints.length < 2) return false;

    const baseThreshold = shape.properties?.strokeWidth?.value / 2 + 3;
    const threshold =
        options.type === "circle"
            ? baseThreshold + (options.radius || 0)
            : baseThreshold;

    const localX = x - shape.x;
    const localY = y - shape.y;

    for (let i = 0; i < rawPoints.length - 1; i++) {
        const p1 = rawPoints[i];
        const p2 = rawPoints[i + 1];
        const dist = distancePointToSegment({ x: localX, y: localY }, p1, p2);
        if (dist <= threshold) return true;
    }

    if (threshold > 12 && shape.strokePoints?.length > 2) {
        if (isPointInPolygon({ x: localX, y: localY }, shape.strokePoints))
            return true;
    }

    return false;
}

function hitTestRectShape(shape, x, y, options = { type: "point" }) {
    const strokeWidth = shape.properties.strokeWidth.value;
    const baseTolerance = Math.max(4, strokeWidth * 2);
    const tolerance =
        options.type === "circle"
            ? baseTolerance + (options.radius || 0)
            : baseTolerance;

    const left = shape.x;
    const right = shape.x + shape.width;
    const top = shape.y;
    const bottom = shape.y + shape.height;

    const nearLeft =
        x >= left - tolerance &&
        x <= left + tolerance &&
        y >= top - tolerance &&
        y <= bottom + tolerance;
    const nearRight =
        x >= right - tolerance &&
        x <= right + tolerance &&
        y >= top - tolerance &&
        y <= bottom + tolerance;
    const nearTop =
        y >= top - tolerance &&
        y <= top + tolerance &&
        x >= left - tolerance &&
        x <= right + tolerance;
    const nearBottom =
        y >= bottom - tolerance &&
        y <= bottom + tolerance &&
        x >= left - tolerance &&
        x <= right + tolerance;

    return nearLeft || nearRight || nearTop || nearBottom;
}

function hitTestArrowShape(shape, x, y, options = { type: "point" }) {
    const strokeWidth = shape.properties?.strokeWidth?.value;
    const baseThreshold = strokeWidth / 2 + 3;
    const threshold =
        options.type === "circle"
            ? baseThreshold + (options.radius || 0)
            : baseThreshold;

    const localX = x - shape.x;
    const localY = y - shape.y;

    const pts = shape.points;
    if (!pts || pts.length < 4) return false;

    // Shaft: first two points
    if (
        distancePointToSegment({ x: localX, y: localY }, pts[0], pts[1]) <=
        threshold
    ) {
        return true;
    }

    // Arrowhead: last three points (tip + left + right)
    const arrowHeadPoints = [pts[1], pts[2], pts[3]];
    if (isPointInPolygon({ x: localX, y: localY }, arrowHeadPoints)) {
        return true;
    }

    return false;
}

export const hitTestTextShape = (shape, x, y, options = { type: "point" }) => {
    const bounds = getTextShapeBounds(shape);
    if (!bounds) return false;

    const tolerance = options.type === "circle" ? options.radius || 0 : 0;

    return (
        x >= bounds.x - tolerance &&
        x <= bounds.x + bounds.width + tolerance &&
        y >= bounds.y - tolerance &&
        y <= bounds.y + bounds.height + tolerance
    );
};

// Registry
export const shapeHitTestRegistry = {
    [SHAPES.PEN]: hitTestPenShape,
    [SHAPES.RECTANGLE]: hitTestRectShape,
    [SHAPES.ARROW]: hitTestArrowShape,
    [SHAPES.TEXT]: hitTestTextShape,
};
