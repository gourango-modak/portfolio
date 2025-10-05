import { ArrowShape } from "./ArrowShape";
import { PenShape } from "./PenShape";
import { RectShape } from "./RectShape";
import { SHAPES } from "./shapesUtils";
import { TextShape } from "./TextShape";

export const shapeRegistry = {
    [SHAPES.PEN]: PenShape,
    [SHAPES.RECTANGLE]: RectShape,
    [SHAPES.ARROW]: ArrowShape,
    [SHAPES.TEXT]: TextShape,
};
