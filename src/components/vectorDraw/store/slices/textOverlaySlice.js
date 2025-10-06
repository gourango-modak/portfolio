import { CANVAS_MODES } from "../../canvasUtils";
import { SHAPES } from "../../shapes/shapesUtils";

export const createTextOverlaySlice = (set, get) => ({
    textOverlaySlice: {
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
            set((state) => ({
                textOverlaySlice: {
                    ...state.textOverlaySlice,
                    isOpen: true,
                    position: { ...position },
                    startPoint: { ...startPoint },
                    properties,
                    text,
                    shapeId,
                    isNew,
                },
            })),

        close: () => {
            const { text, startPoint, properties, isNew, shapeId } =
                get().textOverlaySlice;
            const shapeSlice = get().shapeSlice;
            const canvasPropertiesSlice = get().canvasPropertiesSlice;

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
                    if (
                        canvasPropertiesSlice.properties.mode.value ===
                        CANVAS_MODES.PAGED
                    ) {
                        shape.frameId = canvasStore.activeFrameId;
                    }
                    shapeSlice.addShape(shape);
                } else if (shapeId) {
                    // Update existing shape
                    const existingShape = shapeSlice.shapes[shapeId];
                    if (existingShape) {
                        existingShape.text = text;
                        existingShape.properties = { ...properties };
                        existingShape.isEditing = false;
                        shapeSlice.updateShape(shapeId, existingShape);
                    }
                }
            }

            // Reset overlay state
            set((state) => ({
                textOverlaySlice: {
                    ...state.textOverlaySlice,
                    isOpen: false,
                    text: "",
                    startPoint: { x: 0, y: 0 },
                    properties: {},
                    shapeId: null,
                    isNew: true,
                },
            }));
        },

        setText: (text) =>
            set((state) => ({
                textOverlaySlice: { ...state.textOverlaySlice, text },
            })),
    },
});
