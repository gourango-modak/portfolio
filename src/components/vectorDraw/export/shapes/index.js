import { SHAPES } from "../../shapes/constants";
import { createArrowShape } from "./arrowShape";
import { createPenShape } from "./penShape";
import { createRectShape } from "./rectShape";
import { createTextShape } from "./textShape";

export function shapeToSvgElement(shape) {
    switch (shape.type) {
        case SHAPES.ARROW:
            return createArrowShape(shape);
        case SHAPES.TEXT:
            return createTextShape(shape);
        case SHAPES.PEN:
            return createPenShape(shape);
        case SHAPES.RECTANGLE:
            return createRectShape(shape);
        default:
            console.warn("Unknown shape type:", shape.type);
            return null;
    }
}
