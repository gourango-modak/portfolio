import { useCanvasStore } from "./useCanvasStore";

export function genId() {
    return (
        "s_" + Date.now().toString(36) + "_" + Math.floor(Math.random() * 10000)
    );
}

export function isPointInFrame(point, frame) {
    return (
        point.x >= frame.x &&
        point.x <= frame.x + frame.width &&
        point.y >= frame.y &&
        point.y <= frame.y + frame.height
    );
}

export function isPointInShape(point, shape) {
    const checkRect = (s) => {
        return (
            point.x >= s.x &&
            point.x <= s.x + s.width &&
            point.y >= s.y &&
            point.y <= s.y + s.height
        );
    };

    switch (shape.type) {
        case "rectangle":
            return checkRect(shape);
        case "ellipse": {
            const cx = shape.cx;
            const cy = shape.cy;
            const rx = shape.rx;
            const ry = shape.ry;
            const dx = point.x - cx;
            const dy = point.y - cy;
            return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
        }
        case "line":
        case "arrow": {
            const p1 = shape.start;
            const p2 = shape.end;
            const distance = Math.sqrt(
                Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
            );
            const crossProduct =
                (point.y - p1.y) * (p2.x - p1.x) -
                (point.x - p1.x) * (p2.y - p1.y);
            const isClose = Math.abs(crossProduct) / distance < 5;

            const dotProduct =
                (point.x - p1.x) * (p2.x - p1.x) +
                (point.y - p1.y) * (p2.y - p1.y);
            const isWithinBounds =
                dotProduct >= 0 && dotProduct <= distance * distance;

            return isClose && isWithinBounds;
        }
        default:
            return false;
    }
}

export function validateShape(shape) {
    if (!shape || !shape.type) return false;
    switch (shape.type) {
        case "rectangle":
            return shape.width > 0 && shape.height > 0;
        case "ellipse":
            return shape.rx > 0 && shape.ry > 0;
        case "line":
        case "arrow":
            return (
                shape.start.x !== shape.end.x || shape.start.y !== shape.end.y
            );
        default:
            return false;
    }
}
