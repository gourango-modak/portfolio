import { shapeBoundingRectRegistry } from "./shapes/boundingRectRegistry";
import { shapeHitTestRegistry } from "./shapes/hitTestRegistry";

export const getSvgPathFromStroke = (stroke) => {
    if (!stroke.length) return "";
    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ["M", ...stroke[0], "Q"]
    );
    d.push("Z");
    return d.join(" ");
};

export const getShapeBoundingRect = (shape) => {
    const getBoundingRectFn = shapeBoundingRectRegistry[shape.type];
    return getBoundingRectFn(shape);
};

export const computeSelectedShapesBounds = (selectedShapeIds, shapes) => {
    if (selectedShapeIds.size <= 0) return null;

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    selectedShapeIds.forEach((id) => {
        const shape = shapes[id];
        if (!shape) return;

        const { x, y, width, height } = getShapeBoundingRect(shape);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    });

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};

export const findShapeAtPoint = (shape, { x, y }) => {
    const hitTestFn = shapeHitTestRegistry[shape.type];
    return hitTestFn && hitTestFn(shape, x, y);
};
