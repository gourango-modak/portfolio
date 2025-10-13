import { computeShapeBoundingBox } from "./shapeBoundingBox";

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
