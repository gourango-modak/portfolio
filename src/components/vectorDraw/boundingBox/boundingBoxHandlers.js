import { SHAPES } from "../shapes/constants";
import { computeArrowBoundingBox } from "./arrowBoundingBox";
import { computeBoundingBox } from "./defaultBoundingBox";

export const boundingBoxHandlers = {
    [SHAPES.PEN]: computeBoundingBox,
    [SHAPES.RECTANGLE]: computeBoundingBox,
    [SHAPES.ARROW]: computeArrowBoundingBox,
    [SHAPES.TEXT]: computeBoundingBox,
    FRAME: computeBoundingBox,
};
