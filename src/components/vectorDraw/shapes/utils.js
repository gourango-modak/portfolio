import { shapeSlice } from "../store/utils";
import { shapeHitTestingHandlers } from "./shapeHitTesting/handlers";

export const findShapeAtPoint = (shape, point) => {
    const { x, y } = point;
    const hitTestFn = shapeHitTestingHandlers[shape.type];
    return hitTestFn && hitTestFn(shape, x, y);
};

// Returns the first shape under a point or null
export const getShapeAtPoint = (point, shapes) => {
    const { shapeOrder } = shapeSlice.getSlice();

    // Only consider shape IDs that exist in the provided shapes object
    const validShapeIds = shapeOrder.filter((id) => shapes[id]);

    // Find the topmost shape containing the point
    const shapeId = validShapeIds.find((id) =>
        findShapeAtPoint(shapes[id], point)
    );

    return shapeId ? shapes[shapeId] : null;
};
