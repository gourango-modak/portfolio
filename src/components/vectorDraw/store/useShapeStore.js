import { create } from "zustand";
import { zustandHmrFix } from "./zustandHmrFix";
import { generateId } from "./../../../utils/common";
import { computeSelectedShapesBounds } from "../canvasUtils";

export const useShapeStore = create((set) => ({
    shapes: {},
    shapeOrder: [],

    setShapes: (newShapes, newShapeOrder) => {
        set(() => ({
            shapes: newShapes,
            shapeOrder: newShapeOrder,
        }));
    },

    addShape: (shape) => {
        const id = generateId();
        set((state) => ({
            shapes: { ...state.shapes, [id]: { id, version: 1, ...shape } },
            shapeOrder: [...state.shapeOrder, id],
        }));
        return id;
    },

    updateShape: (id, updatedProps) =>
        set((state) => {
            const shape = state.shapes[id];
            if (!shape) return {};

            const newShapes = {
                ...state.shapes,
                [id]: { ...shape, ...updatedProps, version: shape.version + 1 },
            };

            // Only recompute bounds if the updated shape is selected
            const newBounds = state.selectedShapeIds.has(id)
                ? computeSelectedShapesBounds(state.selectedShapeIds, newShapes)
                : state.selectedShapesBounds;

            return {
                shapes: newShapes,
                selectedShapesBounds: newBounds,
            };
        }),

    selectedShapeIds: new Set(), // track selected shapes by id
    selectedShapesBounds: null, // store combined bounds for quick access

    selectShape: (id) =>
        set((state) => {
            const newSelected = new Set(state.selectedShapeIds);
            newSelected.add(id);
            const newBounds = computeSelectedShapesBounds(
                newSelected,
                state.shapes
            );

            return {
                selectedShapeIds: newSelected,
                selectedShapesBounds: newBounds,
            };
        }),

    deselectShape: (id) =>
        set((state) => {
            const newSelected = new Set(state.selectedShapeIds);
            newSelected.delete(id);
            const newBounds =
                newSelected.size > 0
                    ? computeSelectedShapesBounds(newSelected, state.shapes)
                    : null;
            return {
                selectedShapeIds: newSelected,
                selectedShapesBounds: newBounds,
            };
        }),

    deselectAll: () =>
        set({ selectedShapeIds: new Set(), selectedShapesBounds: null }),
}));

// Keeps Zustand state across hot reloads in dev (ignored in production)
zustandHmrFix("shapeStore", useShapeStore);
