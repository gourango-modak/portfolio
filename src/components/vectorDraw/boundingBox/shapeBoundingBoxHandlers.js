import { SHAPES } from "../shapes/constants";
import { computeArrowBoundingBox } from "./arrowBoundingBox";
import { computeBoundingBox } from "./defaultBoundingBox";

export const shapeBoundingBoxHandlers = {
    [SHAPES.PEN]: computeBoundingBox,
    [SHAPES.RECTANGLE]: computeBoundingBox,
    [SHAPES.ARROW]: computeArrowBoundingBox,
    [SHAPES.TEXT]: computeBoundingBox,
};
