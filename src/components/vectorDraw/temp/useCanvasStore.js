import { create } from "zustand";
import { genId } from "../temp/shapesHelpers";

export const useCanvasStore = create((set) => ({
    canvasMode: "infinite",
    frames: {},
    frameOrder: [],
    activeFrameId: null,

    setCanvasMode: (mode) =>
        set({
            canvasMode: mode,
            fames: {},
            frameOrder: [],
            activeFrameId: null,
        }),

    addFrame: (frame) => {
        const id = genId();
        const newFrame = { ...frame, id };
        set((state) => ({
            frames: { ...state.frames, [id]: newFrame },
            frameOrder: [...state.frameOrder, id],
            activeFrameId: state.activeFrameId || id,
        }));
        return id;
    },

    updateFrame: (id, partial) =>
        set((state) => ({
            frames: {
                ...state.frames,
                [id]: { ...state.frames[id], ...partial },
            },
        })),

    setActiveFrame: (id) => set({ activeFrameId: id }),

    nextFrame: () =>
        set((state) => {
            const currentIndex = state.frameOrder.indexOf(state.activeFrameId);
            const nextIndex = (currentIndex + 1) % state.frameOrder.length;
            return { activeFrameId: state.frameOrder[nextIndex] };
        }),

    prevFrame: () =>
        set((state) => {
            const currentIndex = state.frameOrder.indexOf(state.activeFrameId);
            const prevIndex =
                (currentIndex - 1 + state.frameOrder.length) %
                state.frameOrder.length;
            return { activeFrameId: state.frameOrder[prevIndex] };
        }),
}));
