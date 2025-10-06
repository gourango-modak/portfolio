import { generateId } from "../../../../utils/common";

const initialFrameState = {
    frames: {},
    frameOrder: [],
    activeFrameId: null,
    frameTemplate: {
        width: { value: window.innerWidth, label: "Width", type: "numeric" },
        height: { value: window.innerHeight, label: "Height", type: "numeric" },
        bgColor: {
            value: "#ffffff",
            label: "Frame Background",
            type: "color",
            id: "frameColor",
        },
        x: { value: 0, label: "X" },
        y: { value: 0, label: "Y" },
    },
};

export const createFrameSlice = (set, get) => ({
    frameSlice: {
        ...initialFrameState,

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

        addFrame: () =>
            set((state) => {
                const id = generateId();
                const newFrame = { id, ...state.frameSlice.frameTemplate };
                return {
                    frameSlice: {
                        ...state.frameSlice,
                        frames: { ...state.frameSlice.frames, [id]: newFrame },
                        frameOrder: [...state.frameSlice.frameOrder, id],
                        activeFrameId: id,
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
