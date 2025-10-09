import {
    findShapeAtPoint,
    computeShapeBoundingBox,
} from "../../../shapes/utils";
import { getRectFromPoints } from "../../../utils/geometryUtils";
import { SELECTION_MODE } from "../../constants";

export const selectShapesInRect = (
    tool,
    start,
    end,
    shapes,
    deselectAll,
    selectShape
) => {
    const rect = getRectFromPoints(start, end);

    const selected = Object.values(shapes)
        .filter((s) =>
            isShapeSelectedByRect(s, rect, tool.properties.selectionMode.value)
        )
        .map((s) => s.id);

    deselectAll();
    selected.forEach((id) => selectShape(id));
};

// Check if shape is selected by rectangle based on selectionMode
export const isShapeSelectedByRect = (
    shape,
    rect,
    selectionMode = SELECTION_MODE.FULL
) => {
    const { x, y, width, height } = computeShapeBoundingBox(shape);

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
