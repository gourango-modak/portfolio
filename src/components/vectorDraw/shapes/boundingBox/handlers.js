import { SHAPES } from "../constants";
import { computeArrowBoundingBox } from "./arrowBoundingBox";
import { computePenBoundingBox } from "./penBoundingBox";
import { computeRectBoundingBox } from "./rectBoundingBox";
import { computeTextBoundingBox } from "./textBoundingBox";

export const shapeBoundingBoxHandlers = {
    [SHAPES.PEN]: computePenBoundingBox,
    [SHAPES.RECTANGLE]: computeRectBoundingBox,
    [SHAPES.ARROW]: computeArrowBoundingBox,
    [SHAPES.TEXT]: computeTextBoundingBox,
};
