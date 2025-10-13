import { SHAPES } from "../../../shapes/constants";
import { resizeArrowShape } from "./resizeArrowShape";
import { resizePenShape } from "./resizePenShape";
import { resizeRectShape } from "./resizeRectShape";
import { resizeTextShape } from "./resizeTextShape";

export const shapeResizeHandlers = {
    [SHAPES.RECTANGLE]: resizeRectShape,
    [SHAPES.ARROW]: resizeArrowShape,
    [SHAPES.TEXT]: resizeTextShape,
    [SHAPES.PEN]: resizePenShape,
};
