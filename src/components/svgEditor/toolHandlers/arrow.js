import { TOOLS } from "../svgEdtiorConfig";
import { generateId } from "./../../../utils/common";

/**
 * Arrow tool handler
 * - Draws a straight line with an arrowhead from start to end
 */
export const arrowHandler = {
    onPointerDown: (_, { setCurrentShape }, coords) => {
        const { x, y } = coords;
        setCurrentShape({
            id: generateId(),
            type: TOOLS.ARROW,
            start: { x, y },
            end: { x, y },
        });
    },

    onPointerMove: ({ currentShape }, { setCurrentShape }, coords, e) => {
        if (!currentShape || e.buttons !== 1) return;

        const { x, y } = coords;
        setCurrentShape({ ...currentShape, end: { x, y } });
    },

    onPointerUp: ({ currentShape }, { setCurrentShape, setShapes }) => {
        if (!currentShape) return;

        if (currentShape) {
            setShapes((prev) => [...prev, currentShape]);
        }

        setCurrentShape(null);
    },
};
