import { SHAPES } from "../../../shapes/constants";
import { resizeArrow } from "./resizeArrow";
import { resizeFrame } from "./resizeFrame";
import { resizePen } from "./resizePen";
import { resizeRectangle } from "./resizeRectangle";
import { resizeText } from "./resizeText";

export const resizeHandlers = {
    [SHAPES.RECTANGLE]: resizeRectangle,
    [SHAPES.ARROW]: resizeArrow,
    [SHAPES.TEXT]: resizeText,
    [SHAPES.PEN]: resizePen,
    FRAME: resizeFrame,
};
