import { create } from "zustand";
import { createAllActions } from "./shapesActions";

export const useShapesStore = create((set, get) => ({
    shapes: {},
    shapeOrder: [],
    historyPast: [],
    historyFuture: [],
    selectedShapeId: null,
    currentLiveShapeId: null,
    ...createAllActions(set, get),
}));
