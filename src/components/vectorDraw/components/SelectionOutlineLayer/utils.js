import { toViewportPoint } from "../../utils/canvasUtils";
import { HANDLE_CURSORS, HANDLE_SQUARE_SIZE, OUTLINE_COLOR } from "./constants";

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
        stroke: OUTLINE_COLOR,
        strokeWidth: 1,
        strokeDasharray: dash,
    }));
};

export const getBoundingBoxHandleAtPoint = (pointer, bounds, tolerance = 6) => {
    const { x, y, width, height } = bounds;

    const left = x;
    const right = x + width;
    const top = y;
    const bottom = y + height;

    const px = pointer.x;
    const py = pointer.y;

    // Check corners first
    if (Math.abs(px - left) <= tolerance && Math.abs(py - top) <= tolerance)
        return "top-left";
    if (Math.abs(px - right) <= tolerance && Math.abs(py - top) <= tolerance)
        return "top-right";
    if (Math.abs(px - right) <= tolerance && Math.abs(py - bottom) <= tolerance)
        return "bottom-right";
    if (Math.abs(px - left) <= tolerance && Math.abs(py - bottom) <= tolerance)
        return "bottom-left";

    // Check edges
    if (px > left + tolerance && px < right - tolerance) {
        if (Math.abs(py - top) <= tolerance) return "top";
        if (Math.abs(py - bottom) <= tolerance) return "bottom";
    }
    if (py > top + tolerance && py < bottom - tolerance) {
        if (Math.abs(px - left) <= tolerance) return "left";
        if (Math.abs(px - right) <= tolerance) return "right";
    }

    return null; // pointer not on any border
};
