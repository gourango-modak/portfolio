import { CANVAS_MODES } from "../../constants";
import { TOOLS } from "../../tools/constants";

export const createCanvasPropertiesSlice = (set, get) => ({
    canvasPropertiesSlice: {
        properties: {
            mode: { value: CANVAS_MODES.INFINITE, label: "Canvas Mode" },
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
            set((state) => {
                const currentCursor =
                    state.canvasPropertiesSlice.properties.cursor;
                if (currentCursor === cursor) return state; // no change needed
                return {
                    canvasPropertiesSlice: {
                        ...state.canvasPropertiesSlice,
                        properties: {
                            ...state.canvasPropertiesSlice.properties,
                            cursor,
                        },
                    },
                };
            }),

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

                if (mode === CANVAS_MODES.PAGED) {
                    get().frameSlice.reset();
                } else {
                    get().frameSlice.resetActiveFrame();
                }

                get().toolbarSlice.setActiveTool(TOOLS.SELECTION);
                get().panelSlice.closeToolPropertiesPanel();

                if (mode === CANVAS_MODES.SHORTCUTS) {
                    get().panelSlice.closeToolbarPanel();
                } else {
                    get().panelSlice.openToolbarPanel();
                }

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

        resetViewport: () =>
            set((state) => ({
                canvasPropertiesSlice: {
                    ...state.canvasPropertiesSlice,
                    properties: {
                        ...state.canvasPropertiesSlice.properties,
                        pan: { x: 0, y: 0 },
                        scale: 1,
                    },
                },
            })),

        getCanvasMode: () => {
            return get().canvasPropertiesSlice.properties.mode.value;
        },

        isPagedCanvasMode: () => {
            return (
                get().canvasPropertiesSlice.getCanvasMode() ===
                CANVAS_MODES.PAGED
            );
        },

        isInfiniteCanvasMode: () => {
            return (
                get().canvasPropertiesSlice.getCanvasMode() ===
                CANVAS_MODES.INFINITE
            );
        },

        serialize: () => {
            const { properties } = get().canvasPropertiesSlice;
            return {
                pan: properties.pan,
                scale: properties.scale,
                mode: properties.mode.value,
                canvasBgColor: properties.canvasBgColor.value,
            };
        },

        deserialize: (data) => {
            if (!data) return;
            set((state) => ({
                canvasPropertiesSlice: {
                    ...state.canvasPropertiesSlice,
                    properties: {
                        ...state.canvasPropertiesSlice.properties,
                        pan:
                            data.pan ??
                            state.canvasPropertiesSlice.properties.pan,
                        scale:
                            data.scale ??
                            state.canvasPropertiesSlice.properties.scale,
                        mode: {
                            ...state.canvasPropertiesSlice.properties.mode,
                            value:
                                data.mode ??
                                state.canvasPropertiesSlice.properties.mode
                                    .value,
                        },
                        canvasBgColor: {
                            ...state.canvasPropertiesSlice.properties
                                .canvasBgColor,
                            value:
                                data.canvasBgColor ??
                                state.canvasPropertiesSlice.properties
                                    .canvasBgColor.value,
                        },
                    },
                },
            }));
        },
    },
});
