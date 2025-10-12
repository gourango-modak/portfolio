import { shapeSlice } from "../store/utils";
import { shapeBoundingBoxHandlers } from "./boundingBox/handlers";
import { shapeHitTestingHandlers } from "./shapeHitTesting/handlers";

export const findShapeAtPoint = (shape, point) => {
    const { x, y } = point;
    const hitTestFn = shapeHitTestingHandlers[shape.type];
    return hitTestFn && hitTestFn(shape, x, y);
};

export const computeShapeBoundingBox = (shape) => {
    const computeBoundingBoxFn = shapeBoundingBoxHandlers[shape.type];
    return computeBoundingBoxFn(shape);
};

// Returns the first shape under a point or null
export const getShapeAtPoint = (point, shapes) => {
    const { shapeOrder } = shapeSlice.getSlice();

    // Only consider shape IDs that exist in the provided shapes object
    const validShapeIds = shapeOrder.filter((id) => shapes[id]);

    // Find the topmost shape containing the point
    const shapeId = validShapeIds.find((id) =>
        findShapeAtPoint(shapes[id], point)
    );

    return shapeId ? shapes[shapeId] : null;
};

export const computeShapesBoundingBox = (shapeIds, shapes) => {
    if (shapeIds.size <= 0) return null;

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    shapeIds.forEach((id) => {
        const shape = shapes[id];
        if (!shape) return;

        const { x, y, width, height } = computeShapeBoundingBox(shape);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    });

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};
