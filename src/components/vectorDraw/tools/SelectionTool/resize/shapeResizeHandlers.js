import { SHAPES } from "../../../shapes/constants";
import { resizeArrow } from "./resizeArrow";
import { resizeRectangle } from "./resizeRectangle";
import { resizeText } from "./resizeText";

export const shapeResizeHandlers = {
    [SHAPES.RECTANGLE]: resizeRectangle,
    [SHAPES.ARROW]: resizeArrow,
    [SHAPES.TEXT]: resizeText,
};
