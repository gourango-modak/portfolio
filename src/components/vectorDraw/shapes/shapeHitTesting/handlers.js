import { SHAPES } from "../constants";
import { testPenHit } from "./testPenHit";
import { testRectHit } from "./testRectHit";
import { testArrowHit } from "./testArrowHit";
import { testTextHit } from "./testTextHit";

export const shapeHitTestingHandlers = {
    [SHAPES.PEN]: testPenHit,
    [SHAPES.RECTANGLE]: testRectHit,
    [SHAPES.ARROW]: testArrowHit,
    [SHAPES.TEXT]: testTextHit,
};
