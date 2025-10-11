import { SHAPES } from "../constants";
import { computeArrowBoundingBox } from "./arrowBoundingBox";
import { computeBoundingBox } from "./defaultBoundingBox";
import { computePenBoundingBox } from "./penBoundingBox";

export const shapeBoundingBoxHandlers = {
    [SHAPES.PEN]: computePenBoundingBox,
    [SHAPES.RECTANGLE]: computeBoundingBox,
    [SHAPES.ARROW]: computeArrowBoundingBox,
    [SHAPES.TEXT]: computeBoundingBox,
};
