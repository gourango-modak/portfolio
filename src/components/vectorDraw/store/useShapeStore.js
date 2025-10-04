import { create } from "zustand";
import { zustandHmrFix } from "./zustandHmrFix";
import { generateId } from "./../../../utils/common";

export const useShapeStore = create((set) => ({
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
}));

// Keeps Zustand state across hot reloads in dev (ignored in production)
zustandHmrFix("shapeStore", useShapeStore);
