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

export const createFramesSlice = (set, get) => ({
    framesSlice: {
        ...initialFrameState,

        updateFrameTemplate: (updates) =>
            set((state) => {
                const entries = Object.entries(updates).map(([key, value]) => [
                    key,
                    { ...state.framesSlice.frameTemplate[key], value },
                ]);
                return {
                    framesSlice: {
                        ...state.framesSlice,
                        frameTemplate: {
                            ...state.framesSlice.frameTemplate,
                            ...Object.fromEntries(entries),
                        },
                    },
                };
            }),

        addFrame: () =>
            set((state) => {
                const id = generateId();
                const newFrame = { id, ...state.framesSlice.frameTemplate };
                return {
                    framesSlice: {
                        ...state.framesSlice,
                        frames: { ...state.framesSlice.frames, [id]: newFrame },
                        frameOrder: [...state.framesSlice.frameOrder, id],
                        activeFrameId: id,
                    },
                };
            }),

        setFrameBg: (frameId, color) =>
            set((state) => ({
                framesSlice: {
                    ...state.framesSlice,
                    frames: {
                        ...state.framesSlice.frames,
                        [frameId]: {
                            ...state.framesSlice.frames[frameId],
                            bgColor: {
                                ...state.framesSlice.frames[frameId].bgColor,
                                value: color,
                            },
                        },
                    },
                },
            })),

        nextFrame: () =>
            set((state) => {
                const idx = state.framesSlice.frameOrder.indexOf(
                    state.framesSlice.activeFrameId
                );
                if (idx >= 0 && idx < state.framesSlice.frameOrder.length - 1) {
                    return {
                        framesSlice: {
                            ...state.framesSlice,
                            activeFrameId:
                                state.framesSlice.frameOrder[idx + 1],
                        },
                    };
                }
                return {};
            }),

        prevFrame: () =>
            set((state) => {
                const idx = state.framesSlice.frameOrder.indexOf(
                    state.framesSlice.activeFrameId
                );
                if (idx > 0) {
                    return {
                        framesSlice: {
                            ...state.framesSlice,
                            activeFrameId:
                                state.framesSlice.frameOrder[idx - 1],
                        },
                    };
                }
                return {};
            }),

        hasFrame: () => get().framesSlice.frameOrder.length > 0,
        hasNextFrame: (frameId) => {
            const idx = get().framesSlice.frameOrder.indexOf(frameId);
            return idx >= 0 && idx < get().framesSlice.frameOrder.length - 1;
        },
        hasPrevFrame: (frameId) =>
            get().framesSlice.frameOrder.indexOf(frameId) > 0,
    },
});
