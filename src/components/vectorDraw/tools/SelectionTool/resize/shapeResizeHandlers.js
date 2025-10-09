import { SHAPES } from "../../../shapes/constants";
import { resizeArrow } from "./resizeArrow";
import { resizeRectangle } from "./resizeRectangle";

export const shapeResizeHandlers = {
    [SHAPES.RECTANGLE]: resizeRectangle,
    [SHAPES.ARROW]: resizeArrow,
};
