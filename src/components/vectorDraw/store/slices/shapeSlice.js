import { generateId } from "../../../../utils/common";
import { computeSelectedShapesBounds } from "../../shapes/utils";
import { COMMANDS } from "./commandHistorySlice/constants";

export const createShapeSlice = (set, get) => ({
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
            const newShape = { id, version: 1, ...shape };

            get().commandHistorySlice.executeCommand({
                type: COMMANDS.ADD_SHAPE,
                shape: newShape,
            });

            return id;
        },

        updateShape: (id, updatedProps) => {
            const shape = get().shapeSlice.shapes[id];
            if (!shape) return;

            set((state) => {
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
            });
        },

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

        reset: () =>
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    shapes: {},
                    shapeOrder: [],
                    selectedShapeIds: new Set(),
                    selectedShapesBounds: null,
                },
            })),

        serialize: () => {
            const { shapes, shapeOrder } = get().shapeSlice;
            return { shapes, shapeOrder }; // return plain object
        },

        deserialize: (data) => {
            if (!data) return;
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    shapes: data.shapes ?? state.shapeSlice.shapes,
                    shapeOrder: data.shapeOrder ?? state.shapeSlice.shapeOrder,
                },
            }));
        },
    },
});
