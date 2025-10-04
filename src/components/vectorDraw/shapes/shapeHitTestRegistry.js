import { distancePointToSegment, isPointInPolygon } from "../geometryUtils";
import { SHAPES } from "./shapesUtils";

function hitTestPenShape(shape, x, y) {
    const rawPoints = shape.points;
    if (!rawPoints || rawPoints.length < 2) return false;

    const threshold = shape.properties?.strokeWidth?.value / 2 + 3;

    // Convert global → local coordinates
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

function hitTestRectShape(shape, x, y) {
    const { x: sx, y: sy, width, height } = shape;
    const strokeWidth = shape.properties.strokeWidth.value;
    const tolerance = Math.max(4, strokeWidth * 2);

    const left = sx;
    const right = sx + width;
    const top = sy;
    const bottom = sy + height;

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

// Registry of all hit test functions
export const shapeHitTestRegistry = {
    [SHAPES.PEN]: hitTestPenShape,
    [SHAPES.RECTANGLE]: hitTestRectShape,
};
