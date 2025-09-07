import { TOOLS } from "../svgEdtiorConfig";

export const moveHandler = {
    onPointerDown: ({ shapes }, { setCurrentShape }, coords, e) => {
        // Identify the topmost shape under the pointer
        const hitShape = [...shapes]
            .reverse()
            .find((shape) => isPointInsideShape(shape, coords));
        console.log(hitShape);
        if (hitShape) {
            e.currentTarget.setPointerCapture(e.pointerId);
            // Store reference to moving shape

            if (hitShape.type === TOOLS.RECTANGLE) {
                const x1 = Math.min(hitShape.start.x, hitShape.end.x);
                const y1 = Math.min(hitShape.start.y, hitShape.end.y);
                setCurrentShape({
                    ...hitShape,
                    offset: {
                        x: coords.x - x1,
                        y: coords.y - y1,
                    },
                });
            } else if (hitShape.type === TOOLS.ARROW) {
                setCurrentShape({
                    ...hitShape,
                    offset: {
                        x: coords.x - hitShape.start.x,
                        y: coords.y - hitShape.start.y,
                    },
                });
            } else if (hitShape.type === TOOLS.TEXT) {
                setCurrentShape({
                    ...hitShape,
                    offset: {
                        x: coords.x - (hitShape.x || 0),
                        y: coords.y - (hitShape.y || 0),
                    },
                });
            }
        }
    },

    onPointerMove: ({ currentShape }, { setShapes }, coords, e) => {
        if (!currentShape) return;

        setShapes((prevShapes) =>
            prevShapes.map((s) => {
                if (s.id === currentShape.id) {
                    if (s.type === TOOLS.RECTANGLE) {
                        const width = Math.abs(s.end.x - s.start.x);
                        const height = Math.abs(s.end.y - s.start.y);
                        const rectStartX = coords.x - currentShape.offset.x;
                        const rectStartY = coords.y - currentShape.offset.y;
                        return {
                            ...s,
                            start: { x: rectStartX, y: rectStartY },
                            end: {
                                x: rectStartX + width,
                                y: rectStartY + height,
                            },
                        };
                    }

                    if (s.type === TOOLS.ARROW) {
                        const dx = s.end.x - s.start.x;
                        const dy = s.end.y - s.start.y;
                        const newStart = {
                            x: coords.x - currentShape.offset.x,
                            y: coords.y - currentShape.offset.y,
                        };
                        const newEnd = {
                            x: newStart.x + dx,
                            y: newStart.y + dy,
                        };
                        return { ...s, start: newStart, end: newEnd };
                    }

                    if (s.type === TOOLS.TEXT) {
                        const newX = coords.x - currentShape.offset.x;
                        const newY = coords.y - currentShape.offset.y;
                        return { ...s, x: newX, y: newY };
                    }
                }

                return s;
            })
        );
    },

    onPointerUp: ({}, { setCurrentShape }, coords, e) => {
        setCurrentShape(null);
    },
};

/** Simple hit detection for shape (rectangle/circle/freehand) */
function isPointInsideShape(shape, point) {
    if (shape.type === TOOLS.RECTANGLE) {
        const x1 = Math.min(shape.start.x, shape.end.x);
        const y1 = Math.min(shape.start.y, shape.end.y);
        const width = Math.abs(shape.end.x - shape.start.x);
        const height = Math.abs(shape.end.y - shape.start.y);
        return (
            point.x >= x1 &&
            point.x <= x1 + width &&
            point.y >= y1 &&
            point.y <= y1 + height
        );
    } else if (shape.type === TOOLS.ARROW) {
        const x1 = Math.min(shape.start.x, shape.end.x);
        const y1 = Math.min(shape.start.y, shape.end.y);
        const width = Math.abs(shape.end.x - shape.start.x);
        const height = Math.abs(shape.end.y - shape.start.y);
        return (
            point.x >= x1 &&
            point.x <= x1 + width &&
            point.y >= y1 &&
            point.y <= y1 + height
        );
    } else if (shape.type === TOOLS.PEN) {
        return shape.points.some(
            (p) => Math.hypot(point.x - p[0], point.y - p[1]) <= 5
        );
    } else if (shape.type === TOOLS.TEXT) {
        const textBox = {
            x: shape.x,
            y: shape.y - shape.fontSize,
            width: shape.value.length * (shape.fontSize * 0.6),
            height: shape.fontSize,
        };
        return (
            point.x >= textBox.x &&
            point.x <= textBox.x + textBox.width &&
            point.y >= textBox.y &&
            point.y <= textBox.y + textBox.height
        );
    }
}
