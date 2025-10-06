import { CANVAS_MODES } from "../../canvasUtils";

export const createCanvasPropertiesSlice = (set) => ({
    canvasPropertiesSlice: {
        properties: {
            mode: { value: CANVAS_MODES.PAGED, label: "Canvas Mode" },
            canvasBgColor: {
                value: "#F9F9F9",
                label: "Canvas Background",
                type: "color",
                id: "canvasBgColor",
            },
            pan: { x: 0, y: 0 },
            scale: 1,
            cursor: "default",
        },

        setCursor: (cursor) =>
            set((state) => ({
                canvasPropertiesSlice: {
                    ...state.canvasPropertiesSlice,
                    properties: {
                        ...state.canvasPropertiesSlice.properties,
                        cursor,
                    },
                },
            })),

        setScale: (scale) =>
            set((state) => ({
                canvasPropertiesSlice: {
                    ...state.canvasPropertiesSlice,
                    properties: {
                        ...state.canvasPropertiesSlice.properties,
                        scale,
                    },
                },
            })),

        setPan: (pan) =>
            set((state) => ({
                canvasPropertiesSlice: {
                    ...state.canvasPropertiesSlice,
                    properties: {
                        ...state.canvasPropertiesSlice.properties,
                        pan,
                    },
                },
            })),

        setCanvasMode: (mode) =>
            set((state) => {
                if (state.canvasPropertiesSlice.properties.mode.value === mode)
                    return {};
                const updatedProperties = {
                    ...state.canvasPropertiesSlice.properties,
                    mode: {
                        ...state.canvasPropertiesSlice.properties.mode,
                        value: mode,
                    },
                };
                return {
                    canvasPropertiesSlice: {
                        ...state.canvasPropertiesSlice,
                        properties: updatedProperties,
                    },
                };
            }),

        setCanvasBg: (color) =>
            set((state) => ({
                canvasPropertiesSlice: {
                    ...state.canvasPropertiesSlice,
                    properties: {
                        ...state.canvasPropertiesSlice.properties,
                        canvasBgColor: {
                            ...state.canvasPropertiesSlice.properties
                                .canvasBgColor,
                            value: color,
                        },
                    },
                },
            })),
    },
});
