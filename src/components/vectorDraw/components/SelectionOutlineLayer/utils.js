import { toViewportPoint } from "../../utils/canvasUtils";
import { HANDLE_SQUARE_OFFSET } from "./constants";

export const getBoundingBoxHandles = (
    bounds,
    padding = HANDLE_SQUARE_OFFSET,
    scale,
    pan
) => {
    const { x, y, width, height } = bounds;

    const topLeft = toViewportPoint(
        { x: x - padding, y: y - padding },
        scale,
        pan
    );
    const topRight = toViewportPoint(
        {
            x: x + width + padding,
            y: y - padding,
        },
        scale,
        pan
    );
    const bottomRight = toViewportPoint(
        {
            x: x + width + padding,
            y: y + height + padding,
        },
        scale,
        pan
    );
    const bottomLeft = toViewportPoint(
        {
            x: x - padding,
            y: y + height + padding,
        },
        scale,
        pan
    );

    return {
        "top-left": { ...topLeft, cursor: "nwse-resize" },
        "top-right": {
            ...topRight,
            cursor: "nesw-resize",
        },
        "bottom-right": {
            ...bottomRight,
            cursor: "nwse-resize",
        },
        "bottom-left": {
            ...bottomLeft,
            cursor: "nesw-resize",
        },
    };
};

export const getLineSegmentHandles = (shape, scale, pan) => {
    // Absolute coordinates of line start and end
    const viewportP1 = toViewportPoint(
        {
            x: shape.x + shape.x1,
            y: shape.y + shape.y1,
        },
        scale,
        pan
    );
    const viewportP2 = toViewportPoint(
        {
            x: shape.x + shape.x2,
            y: shape.y + shape.y2,
        },
        scale,
        pan
    );

    return {
        "line-start": {
            ...viewportP1,
            cursor: "nesw-resize",
        },
        "line-end": {
            ...viewportP2,
            cursor: "nesw-resize",
        },
    };
};
