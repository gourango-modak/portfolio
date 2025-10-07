import { shapeSlice } from "../store/utils";
import { SELECTION_MODE } from "../tools/constants";
import { shapeBoundingRectRegistry } from "./boundingRectRegistry";
import { shapeHitTestRegistry } from "./hitTestRegistry";

export const findShapeAtPoint = (shape, point) => {
    const { x, y } = point;
    const hitTestFn = shapeHitTestRegistry[shape.type];
    return hitTestFn && hitTestFn(shape, x, y);
};

export const getShapeBoundingRect = (shape) => {
    const getBoundingRectFn = shapeBoundingRectRegistry[shape.type];
    return getBoundingRectFn(shape);
};

// Check if shape is selected by rectangle based on selectionMode
export const isShapeSelectedByRect = (
    shape,
    rect,
    selectionMode = SELECTION_MODE.FULL
) => {
    const { x, y, width, height } = getShapeBoundingRect(shape);

    if (selectionMode === SELECTION_MODE.FULL) {
        // Fully inside selection
        return (
            x >= rect.x &&
            y >= rect.y &&
            x + width <= rect.x + rect.width &&
            y + height <= rect.y + rect.height
        );
    } else if (selectionMode === SELECTION_MODE.TOUCH) {
        // Hit-test: check a few points inside the selection rect to see if they touch the shape
        const step = 5; // sampling step in px
        for (let px = rect.x; px <= rect.x + rect.width; px += step) {
            for (let py = rect.y; py <= rect.y + rect.height; py += step) {
                if (findShapeAtPoint(shape, { x: px, y: py })) {
                    return true; // at least one point hits the shape
                }
            }
        }
    }

    return false;
};

// Returns the first shape under a point or null
export const getShapeAtPoint = (point) => {
    const { shapes, shapeOrder } = shapeSlice.getSlice();
    const shapeId = shapeOrder.find((id) =>
        findShapeAtPoint(shapes[id], point)
    );
    return shapeId >= 0 ? shapes[shapeId] : null;
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
