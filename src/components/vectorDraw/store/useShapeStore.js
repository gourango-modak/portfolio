import { create } from "zustand";
import { zustandHmrFix } from "./zustandHmrFix";
import { generateId } from "./../../../utils/common";

export const useShapeStore = create((set, get) => ({
    shapes: {},
    shapeOrder: [],

    addShape: (shape) => {
        const id = generateId();
        set((state) => ({
            shapes: { ...state.shapes, [id]: { id, ...shape } },
            shapeOrder: [...state.shapeOrder, id],
        }));
        return id;
    },

    selectedShapeIds: new Set(), // track selected shapes by id

    // Select a shape by id (add to current selection)
    selectShape: (id) =>
        set((state) => {
            const newSelected = new Set(state.selectedShapeIds);
            newSelected.add(id);
            return { selectedShapeIds: newSelected };
        }),

    // Deselect all shapes
    deselectAll: () => set({ selectedShapeIds: new Set() }),

    // Utility: check if a shape is selected
    isSelected: (id) => get().selectedShapeIds.has(id),
}));

// Keeps Zustand state across hot reloads in dev (ignored in production)
zustandHmrFix("shapeStore", useShapeStore);
