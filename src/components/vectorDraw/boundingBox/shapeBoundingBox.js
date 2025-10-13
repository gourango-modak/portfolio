import { shapeBoundingBoxHandlers } from "./shapeBoundingBoxHandlers";

export const computeShapeBoundingBox = (shape) => {
    const computeBoundingBoxFn = shapeBoundingBoxHandlers[shape.type];
    return computeBoundingBoxFn(shape);
};
