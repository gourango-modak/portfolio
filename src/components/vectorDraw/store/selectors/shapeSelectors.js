import { shapeSlice } from "../utils";

export const useSelectedShapeIds = () =>
    shapeSlice.useSliceProperty((s) => s.selectedShapeIds);

export const useSelectedShapesBounds = () =>
    shapeSlice.useSliceProperty((s) => s.selectedShapesBounds);

export const useShapeById = (shapeId) =>
    shapeSlice.useSliceProperty(
        (s) => s.shapes[shapeId],
        (oldShape, newShape) => oldShape?.version === newShape?.version
    );

export const useShapeOrder = () =>
    shapeSlice.useSliceProperty((s) => s.shapeOrder);
