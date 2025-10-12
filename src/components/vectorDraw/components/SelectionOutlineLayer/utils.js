import { toViewportPoint } from "../../utils/canvasUtils";
import { HANDLE_CURSORS, HANDLE_SQUARE_SIZE } from "./constants";

export const getBoundingBoxHandles = (bounds, padding, scale, pan) => {
    const { x, y, width, height } = bounds;

    const points = {
        "top-left": { x: x - padding, y: y - padding },
        "top-right": { x: x + width + padding, y: y - padding },
        "bottom-right": { x: x + width + padding, y: y + height + padding },
        "bottom-left": { x: x - padding, y: y + height + padding },
    };

    return Object.fromEntries(
        Object.entries(points).map(([key, point]) => [
            key,
            {
                ...toViewportPoint(point, scale, pan),
                cursor: HANDLE_CURSORS[key],
            },
        ])
    );
};

export const getLineSegmentHandles = (shape, scale, pan) => {
    const points = {
        "line-start": { x: shape.x + shape.x1, y: shape.y + shape.y1 },
        "line-end": { x: shape.x + shape.x2, y: shape.y + shape.y2 },
    };

    return Object.fromEntries(
        Object.entries(points).map(([key, point]) => [
            key,
            {
                ...toViewportPoint(point, scale, pan),
                cursor: HANDLE_CURSORS[key],
            },
        ])
    );
};

export const getSelectionLines = ({ x, y, width, height, dashed }) => {
    const dash = dashed ? "4 2" : "none";
    const s = HANDLE_SQUARE_SIZE;

    return [
        // Top left
        { x1: x + s / 2, y1: y, x2: x + width - s / 2, y2: y },
        // Top Right
        { x1: x + width, y1: y + s / 2, x2: x + width, y2: y + height - s / 2 },
        // Bottom Right
        {
            x1: x + width - s / 2,
            y1: y + height,
            x2: x + s / 2,
            y2: y + height,
        },
        // Bottom Left
        { x1: x, y1: y + s / 2, x2: x, y2: y + height - s / 2 },
    ].map((lineProps) => ({
        ...lineProps,
        stroke: "#007AFF",
        strokeWidth: 1,
        strokeDasharray: dash,
    }));
};
