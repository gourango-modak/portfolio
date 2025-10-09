import {
    distancePointToSegment,
    isPointInPolygon,
} from "../../utils/geometryUtils";

// options: { type: "point" | "circle", radius?: number }
export const testPenHit = (shape, x, y, options = { type: "point" }) => {
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
};
