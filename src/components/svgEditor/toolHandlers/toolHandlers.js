import { TOOLS } from "../svgEdtiorConfig";
import { penHandler } from "./pen";
import { eraserHandler } from "./eraser";
import { rectangleHandler } from "./rectangle";
import { arrowHandler } from "./arrow";
import { textHandler } from "./text";
import { moveHandler } from "./move";

export const TOOL_HANDLERS = {
    [TOOLS.PEN]: penHandler,
    [TOOLS.ERASER]: eraserHandler,
    [TOOLS.RECTANGLE]: rectangleHandler,
    [TOOLS.ARROW]: arrowHandler,
    [TOOLS.TEXT]: textHandler,
    [TOOLS.MOVE]: moveHandler,
};
