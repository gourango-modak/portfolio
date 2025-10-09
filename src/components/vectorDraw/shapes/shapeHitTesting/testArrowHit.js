import {
    distancePointToSegment,
    isPointInPolygon,
} from "../../utils/geometryUtils";
import { getArrowHeadPoints } from "../../utils/svgUtils";

export const testArrowHit = (shape, x, y, options = { type: "point" }) => {
    const strokeWidth = shape.properties?.strokeWidth?.value || 1;
    const baseThreshold = strokeWidth / 2 + 3;
    const threshold =
        options.type === "circle"
            ? baseThreshold + (options.radius || 0)
            : baseThreshold;

    // Convert pointer to shape-local coordinates
    const localX = x - shape.x;
    const localY = y - shape.y;

    // Extract arrow shaft points
    const start = { x: shape.x1, y: shape.y1 };
    const end = { x: shape.x2, y: shape.y2 };

    // 1. Check if near shaft line segment
    if (
        distancePointToSegment({ x: localX, y: localY }, start, end) <=
        threshold
    ) {
        return true;
    }

    // 2. Check arrowhead
    // Assuming `getRoughArrowPath` generates tip + left + right points
    // We can extract them from the path if stored, or recompute quickly
    const arrowHeadPoints = getArrowHeadPoints(shape); // returns [{x,y}, {x,y}, {x,y}]
    if (isPointInPolygon({ x: localX, y: localY }, arrowHeadPoints)) {
        return true;
    }

    return false;
};
