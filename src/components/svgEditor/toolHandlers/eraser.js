import { TOOLS } from "../svgEdtiorConfig";

export const eraserHandler = {
    onPointerDown: ({ eraserSize }, { setPoints, setShapes }, coords) => {
        setPoints([coords]);
        eraseShapes(coords, setShapes, eraserSize);
    },

    onPointerMove: ({ eraserSize }, { setPoints, setShapes }, coords, e) => {
        if (e.buttons !== 1) return;
        setPoints((prev) => [...prev, coords]);
        eraseShapes(coords, setShapes, eraserSize);
    },

    onPointerUp: (_, { setPoints }) => {
        setPoints([]);
    },
};

/** Erase shapes that intersect the eraser circle */
export const eraseShapes = (pointer, setShapes, size) => {
    setShapes((prevShapes) =>
        prevShapes.filter((shape) => {
            // Remove shape if pointer intersects
            return !isShapeHit(shape, pointer, size / 2);
        })
    );
};

/** Check if eraser hits the shape */
const isShapeHit = (shape, pointer, radius) => {
    switch (shape.type) {
        case TOOLS.RECTANGLE:
        case TOOLS.ARROW: {
            const x1 = Math.min(shape.start.x, shape.end.x);
            const y1 = Math.min(shape.start.y, shape.end.y);
            const width = Math.abs(shape.end.x - shape.start.x);
            const height = Math.abs(shape.end.y - shape.start.y);
            return (
                pointer.x >= x1 - radius &&
                pointer.x <= x1 + width + radius &&
                pointer.y >= y1 - radius &&
                pointer.y <= y1 + height + radius
            );
        }

        case TOOLS.CIRCLE: {
            const dx = pointer.x - shape.x;
            const dy = pointer.y - shape.y;
            return Math.hypot(dx, dy) <= shape.r + radius;
        }

        case TOOLS.PEN: {
            return shape.points.some(
                (p) => Math.hypot(pointer.x - p[0], pointer.y - p[1]) <= radius
            );
        }

        case TOOLS.TEXT: {
            const textBox = {
                x: shape.x,
                y: shape.y - shape.fontSize,
                width: shape.value.length * (shape.fontSize * 0.6),
                height: shape.fontSize,
            };
            return (
                pointer.x >= textBox.x - radius &&
                pointer.x <= textBox.x + textBox.width + radius &&
                pointer.y >= textBox.y - radius &&
                pointer.y <= textBox.y + textBox.height + radius
            );
        }

        default:
            return false;
    }
};
