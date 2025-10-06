import { generateId } from "../../../../utils/common";
import { computeSelectedShapesBounds } from "../../canvasUtils";

export const createShapeSlice = (set) => ({
    shapeSlice: {
        shapes: {},
        shapeOrder: [],

        selectedShapeIds: new Set(), // track selected shapes by id
        selectedShapesBounds: null, // store combined bounds for quick access

        setShapes: (newShapes, newShapeOrder) =>
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    shapes: newShapes,
                    shapeOrder: newShapeOrder,
                },
            })),

        addShape: (shape) => {
            const id = generateId();
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    shapes: {
                        ...state.shapeSlice.shapes,
                        [id]: { id, version: 1, ...shape },
                    },
                    shapeOrder: [...state.shapeSlice.shapeOrder, id],
                },
            }));
            return id;
        },

        updateShape: (id, updatedProps) =>
            set((state) => {
                const shape = state.shapeSlice.shapes[id];
                if (!shape) return {};

                const newShapes = {
                    ...state.shapeSlice.shapes,
                    [id]: {
                        ...shape,
                        ...updatedProps,
                        version: shape.version + 1,
                    },
                };

                const newBounds = state.shapeSlice.selectedShapeIds.has(id)
                    ? computeSelectedShapesBounds(
                          state.shapeSlice.selectedShapeIds,
                          newShapes
                      )
                    : state.shapeSlice.selectedShapesBounds;

                return {
                    shapeSlice: {
                        ...state.shapeSlice,
                        shapes: newShapes,
                        selectedShapesBounds: newBounds,
                    },
                };
            }),

        selectShape: (id) =>
            set((state) => {
                const newSelected = new Set(state.shapeSlice.selectedShapeIds);
                newSelected.add(id);
                const newBounds = computeSelectedShapesBounds(
                    newSelected,
                    state.shapeSlice.shapes
                );

                return {
                    shapeSlice: {
                        ...state.shapeSlice,
                        selectedShapeIds: newSelected,
                        selectedShapesBounds: newBounds,
                    },
                };
            }),

        deselectShape: (id) =>
            set((state) => {
                const newSelected = new Set(state.shapeSlice.selectedShapeIds);
                newSelected.delete(id);
                const newBounds =
                    newSelected.size > 0
                        ? computeSelectedShapesBounds(
                              newSelected,
                              state.shapeSlice.shapes
                          )
                        : null;

                return {
                    shapeSlice: {
                        ...state.shapeSlice,
                        selectedShapeIds: newSelected,
                        selectedShapesBounds: newBounds,
                    },
                };
            }),

        deselectAll: () =>
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    selectedShapeIds: new Set(),
                    selectedShapesBounds: null,
                },
            })),
    },
});
