import { boundingBoxHandlers } from "./boundingBoxHandlers";

export const computeShapeBoundingBox = (shape) => {
    const computeBoundingBoxFn = boundingBoxHandlers[shape.type];
    return computeBoundingBoxFn(shape);
};
