import { create } from "zustand";
import { zustandHmrFix } from "./zustandHmrFix";
import { useShapeStore } from "./useShapeStore";
import { useCanvasStore } from "./useCanvasStore";
import { SHAPES } from "../shapes/shapesUtils";
import { CANVAS_MODES } from "../canvasUtils";

export const useTextInputOverlayStore = create((set, get) => ({
    isOpen: false,
    position: { x: 0, y: 0 },
    startPoint: { x: 0, y: 0 },
    properties: {},
    text: "",
    isNew: true,
    shapeId: null,

    // Open overlay at a given position for a specific shape
    open: ({
        position,
        startPoint,
        properties,
        text = "",
        shapeId = null,
        isNew = true,
    }) =>
        set({
            isOpen: true,
            position: { ...position },
            startPoint: { ...startPoint },
            properties,
            text,
            shapeId,
            isNew,
        }),

    close: () => {
        const { text, startPoint, properties, isNew, shapeId } = get();
        const shapeStore = useShapeStore.getState();
        const canvasStore = useCanvasStore.getState();

        if (text) {
            if (isNew) {
                // Add new shape
                const shape = {
                    type: SHAPES.TEXT,
                    x: startPoint.x,
                    y: startPoint.y,
                    text,
                    properties,
                };
                if (canvasStore.properties.mode.value === CANVAS_MODES.PAGED) {
                    shape.frameId = canvasStore.activeFrameId;
                }
                shapeStore.addShape(shape);
            } else if (shapeId) {
                // Update existing shape
                const existingShape = shapeStore.shapes[shapeId];
                if (existingShape) {
                    existingShape.text = text;
                    existingShape.properties = { ...properties };
                    existingShape.isEditing = false;
                    shapeStore.updateShape(shapeId, existingShape);
                }
            }
        }

        // Reset overlay state
        set({
            isOpen: false,
            text: "",
            startPoint: null,
            properties: null,
            shapeId: null,
            isNew: true,
        });
    },

    setText: (text) => set({ text }),
}));

// Optional: keep state across hot reloads in dev
zustandHmrFix("textInputOverlayStore", useTextInputOverlayStore);
