import { create } from "zustand";
import { CANVAS_MODES } from "../svgCanvasUtils";
import { generateId } from "../../../utils/common";

const defaultFrameTemplate = {
    width: 800,
    height: 1200,
    bgColor: "#fff",
    x: (window.innerWidth - 800) / 2,
    y: 100,
};

const initializeCanvasState = (mode) => {
    const isFrameMode = mode !== CANVAS_MODES.INFINITE;

    if (isFrameMode) {
        const defaultFrameId = generateId();
        return {
            mode,
            frames: {
                [defaultFrameId]: {
                    ...defaultFrameTemplate,
                },
            },
            frameOrder: [defaultFrameId],
            activeFrameId: defaultFrameId,
        };
    } else {
        return {
            mode,
            frames: {},
            frameOrder: [],
            activeFrameId: null,
        };
    }
};

export const useCanvasStore = create((set) => ({
    ...initializeCanvasState(CANVAS_MODES.SINGLE_FRAME),
    bgColor: "#fff",
    setCanvasMode: (mode) => set(() => initializeCanvasState(mode)),

    setCanvasBgColor: (color) =>
        set({
            bgColor: color,
        }),

    setFrameBgColor: (frameId, color) =>
        set((state) => ({
            frames: {
                ...state.frames,
                [frameId]: {
                    ...state.frames[frameId],
                    bgColor: color,
                },
            },
        })),
}));
