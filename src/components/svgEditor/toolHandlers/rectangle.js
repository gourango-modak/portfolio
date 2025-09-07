import { TOOLS } from "../svgEdtiorConfig";
import { generateId } from "./../../../utils/common";

const MIN_SIZE = 5; // Minimum width or height to save

export const rectangleHandler = {
    onPointerDown: (_, { setCurrentShape }, coords) => {
        // Start a new rectangle
        const rect = {
            id: generateId(),
            type: TOOLS.RECTANGLE,
            start: { x: coords.x, y: coords.y },
            end: { x: coords.x, y: coords.y },
        };
        setCurrentShape(rect);
    },

    onPointerMove: ({ currentShape }, { setCurrentShape }, coords, e) => {
        if (!currentShape || e.buttons !== 1) return;

        // Update the width and height dynamically
        setCurrentShape({
            ...currentShape,
            end: { x: coords.x, y: coords.y },
        });
    },

    onPointerUp: ({ currentShape }, { setCurrentShape, setShapes }) => {
        if (!currentShape) return;

        const width = Math.abs(currentShape.end.x - currentShape.start.x);
        const height = Math.abs(currentShape.end.y - currentShape.start.y);

        // Only save if rectangle meets minimum size
        if (width >= MIN_SIZE && height >= MIN_SIZE) {
            setShapes((prev) => [...prev, currentShape]);
        }

        // Clear the temporary current shape
        setCurrentShape(null);
    },
};
