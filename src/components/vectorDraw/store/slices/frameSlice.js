import { generateId } from "../../../../utils/common";
import { COMMANDS } from "./commandHistorySlice/constants";
import { computeFramesBoundingBox } from "./../../boundingBox/framesBoundingBox";
import { TOOL_PROPERTIES } from "../../toolbar/components/properties/constants";

// Margin from the viewport edges to determine initial frame size
const viewportMarginX = 100;
const viewportMarginY = 100;

const initialFrameState = {
    frames: {},
    frameOrder: [],
    selectedFrameIds: new Set(),
    selectedFramesBounds: null,
    activeFrameId: null,
    frameTemplate: {
        [TOOL_PROPERTIES.WIDTH]: {
            value: window.innerWidth - viewportMarginX,
            label: "Width",
        },
        [TOOL_PROPERTIES.HEIGHT]: {
            value: window.innerHeight - viewportMarginY,
            label: "Height",
        },
        [TOOL_PROPERTIES.BG_COLOR]: {
            value: "#fff",
            label: "Background",
            id: "frameColor",
        },
        [TOOL_PROPERTIES.BORDER_COLOR]: {
            value: "#00000033",
            label: "Border Color",
            id: "frameBorderColor",
        },
        [TOOL_PROPERTIES.STROKE_WIDTH]: {
            value: 1,
            label: "Border Width",
            min: 0,
            max: 15,
            step: 1,
        },
    },
};

export const createFrameSlice = (set, get) => ({
    frameSlice: {
        ...initialFrameState,

        deselectAll: () =>
            set((state) => ({
                frameSlice: {
                    ...state.frameSlice,
                    selectedFrameIds: new Set(),
                    selectedFramesBounds: null,
                },
            })),

        selectFrame: (frameId) =>
            set((state) => {
                const newSelected = new Set(state.frameSlice.selectedFrameIds);
                newSelected.add(frameId);

                const newBounds = computeFramesBoundingBox(
                    newSelected,
                    state.frameSlice.frames
                );

                return {
                    frameSlice: {
                        ...state.frameSlice,
                        selectedFrameIds: newSelected,
                        selectedFramesBounds: newBounds,
                        activeFrameId: frameId,
                    },
                    canvasObjectSlice: {
                        ...state.canvasObjectSlice,
                        lastSelectedId: frameId,
                    },
                };
            }),

        updateFrame: (id, updatedProps) => {
            const frame = get().frameSlice.frames[id];
            if (!frame) return;

            set((state) => {
                const newFrames = {
                    ...state.frameSlice.frames,
                    [id]: {
                        ...frame,
                        ...updatedProps,
                        version: (frame.version || 0) + 1, // increment version
                    },
                };

                const newBounds = state.frameSlice.selectedFrameIds.has(id)
                    ? computeFramesBoundingBox(
                          state.frameSlice.selectedFrameIds,
                          newFrames
                      )
                    : state.frameSlice.selectedFramesBounds;

                return {
                    frameSlice: {
                        ...state.frameSlice,
                        frames: newFrames,
                        selectedFramesBounds: newBounds,
                    },
                };
            });
        },

        updateFrameTemplate: (updates) =>
            set((state) => {
                const entries = Object.entries(updates).map(([key, value]) => [
                    key,
                    { ...state.frameSlice.frameTemplate[key], value },
                ]);
                return {
                    frameSlice: {
                        ...state.frameSlice,
                        frameTemplate: {
                            ...state.frameSlice.frameTemplate,
                            ...Object.fromEntries(entries),
                        },
                    },
                };
            }),

        addFrameFromTemplate: () => {
            const id = generateId();

            set((state) => {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const frameWidth = state.frameSlice.frameTemplate.width.value;
                const frameHeight = state.frameSlice.frameTemplate.height.value;

                // Calculate center in canvas coordinates
                const x = viewportWidth / 2 - frameWidth / 2;
                const y = viewportHeight / 2 - frameHeight / 2;

                const newFrame = {
                    id,
                    properties: { ...state.frameSlice.frameTemplate },
                    x,
                    y,
                    width: frameWidth,
                    height: frameHeight,
                };

                return {
                    frameSlice: {
                        ...state.frameSlice,
                        frames: { ...state.frameSlice.frames, [id]: newFrame },
                        frameOrder: [...state.frameSlice.frameOrder, id],
                        activeFrameId: id,
                    },
                    shapeSlice: {
                        ...get().shapeSlice,
                        selectedShapeIds: new Set(),
                        selectedShapesBounds: null,
                    },
                };
            });

            return id;
        },

        addFrame: (frame) => {
            const id = generateId();
            const newFrame = {
                id,
                version: 1,
                ...frame,
            };

            // Execute ADD_FRAME command for history tracking
            get().commandHistorySlice.executeCommand({
                type: COMMANDS.ADD_FRAME,
                frame: newFrame,
            });

            return id;
        },

        setFrames: (newFrames, newFrameOrder) =>
            set((state) => {
                return {
                    frameSlice: {
                        ...state.frameSlice,
                        frames: newFrames,
                        frameOrder: newFrameOrder,
                    },
                };
            }),

        setFrameBg: (frameId, color) =>
            set((state) => ({
                frameSlice: {
                    ...state.frameSlice,
                    frames: {
                        ...state.frameSlice.frames,
                        [frameId]: {
                            ...state.frameSlice.frames[frameId],
                            bgColor: {
                                ...state.frameSlice.frames[frameId].bgColor,
                                value: color,
                            },
                        },
                    },
                },
            })),

        nextFrame: () =>
            set((state) => {
                const idx = state.frameSlice.frameOrder.indexOf(
                    state.frameSlice.activeFrameId
                );
                if (idx >= 0 && idx < state.frameSlice.frameOrder.length - 1) {
                    return {
                        frameSlice: {
                            ...state.frameSlice,
                            activeFrameId: state.frameSlice.frameOrder[idx + 1],
                        },
                    };
                }
                return {};
            }),

        prevFrame: () =>
            set((state) => {
                const idx = state.frameSlice.frameOrder.indexOf(
                    state.frameSlice.activeFrameId
                );
                if (idx > 0) {
                    return {
                        frameSlice: {
                            ...state.frameSlice,
                            activeFrameId: state.frameSlice.frameOrder[idx - 1],
                        },
                    };
                }
                return {};
            }),

        hasFrame: () => get().frameSlice.frameOrder.length > 0,
        hasNextFrame: (frameId) => {
            const idx = get().frameSlice.frameOrder.indexOf(frameId);
            return idx >= 0 && idx < get().frameSlice.frameOrder.length - 1;
        },
        hasPrevFrame: (frameId) =>
            get().frameSlice.frameOrder.indexOf(frameId) > 0,

        getActiveFrame: () => {
            const state = get().frameSlice;
            if (!state.activeFrameId) return null; // no active frame
            return state.frames[state.activeFrameId] || null;
        },
        resetActiveFrame: () =>
            set((state) => ({
                frameSlice: {
                    ...state.frameSlice,
                    activeFrameId: null,
                },
            })),
        reset: () =>
            set((state) => {
                const frames = state.frameSlice.frames;
                const titleShapeIds = Object.values(frames).map(
                    (f) => f.titleShapeId
                );
                const { shapes, shapeOrder } = state.shapeSlice;

                // Remove all shapes that are frame titles
                const filteredShapeOrder = shapeOrder.filter(
                    (id) => !titleShapeIds.includes(id)
                );

                // Rebuild shapes object
                const filteredShapes = {};
                filteredShapeOrder.forEach((id) => {
                    filteredShapes[id] = shapes[id];
                });

                return {
                    frameSlice: {
                        ...state.frameSlice,
                        ...initialFrameState,
                    },
                    shapeSlice: {
                        ...state.shapeSlice,
                        shapes: filteredShapes,
                        shapeOrder: filteredShapeOrder,
                    },
                };
            }),

        serialize: () => {
            const { frames, frameOrder, activeFrameId, frameTemplate } =
                get().frameSlice;
            return {
                frames,
                frameOrder,
                activeFrameId,
                frameTemplate,
            };
        },

        deserialize: (data) => {
            if (!data) return;

            set((state) => ({
                frameSlice: {
                    ...state.frameSlice,
                    frames: data.frames ?? state.frameSlice.frames,
                    frameOrder: data.frameOrder ?? state.frameSlice.frameOrder,
                    activeFrameId:
                        data.activeFrameId ?? state.frameSlice.activeFrameId,
                    frameTemplate:
                        data.frameTemplate ?? state.frameSlice.frameTemplate,
                },
            }));
        },
    },
});
