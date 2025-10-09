import { HANDLE_SQUARE_OFFSET } from "./constants";

export const getBoundingBoxHandles = (
    bounds,
    padding = HANDLE_SQUARE_OFFSET
) => {
    const { x, y, width, height } = bounds;
    return {
        "top-left": { x: x - padding, y: y - padding, cursor: "nwse-resize" },
        "top-right": {
            x: x + width + padding,
            y: y - padding,
            cursor: "nesw-resize",
        },
        "bottom-right": {
            x: x + width + padding,
            y: y + height + padding,
            cursor: "nwse-resize",
        },
        "bottom-left": {
            x: x - padding,
            y: y + height + padding,
            cursor: "nesw-resize",
        },
    };
};

export const getLineSegmentHandles = (shape) => {
    // Absolute coordinates of line start and end
    const p1AbsX = shape.x + shape.x1;
    const p1AbsY = shape.y + shape.y1;

    const p2AbsX = shape.x + shape.x2;
    const p2AbsY = shape.y + shape.y2;

    return {
        "line-start": {
            x: p1AbsX,
            y: p1AbsY,
            cursor: "nesw-resize",
        },
        "line-end": {
            x: p2AbsX,
            y: p2AbsY,
            cursor: "nesw-resize",
        },
    };
};
