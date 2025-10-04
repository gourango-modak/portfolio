import { create } from "zustand";
import { CANVAS_MODES } from "../svgCanvasUtils";
import { zustandHmrFix } from "./zustandHmrFix";
import { generateId } from "../../../utils/common";

const initialFrameState = {
    frames: {},
    frameOrder: [],
    activeFrameId: null,
    frameTemplate: {
        width: 800,
        height: 1200,
        bgColor: "#ffffff",
        x: (window.innerWidth - 800) / 2,
        y: 100,
    },
};

export const useCanvasStore = create((set) => ({
    mode: CANVAS_MODES.PAGED,
    bgColor: "#ffffff",

    setCanvasMode: (mode) =>
        set((state) => {
            if (state.mode === mode) return {};

            if (mode === CANVAS_MODES.INFINITE) {
                return {
                    mode,
                    ...initialFrameState,
                };
            }
            return { mode };
        }),

    setCanvasBg: (color) =>
        set({
            bgColor: color,
        }),

    ...initialFrameState,
    updateFrameTemplate: (property) =>
        set((state) => ({
            frameTemplate: {
                ...state.frameTemplate,
                ...property,
            },
        })),

    setFrameBg: (frameId, color) =>
        set((state) => ({
            frames: {
                ...state.frames,
                [frameId]: {
                    ...state.frames[frameId],
                    bgColor: color,
                },
            },
        })),

    addFrame: () =>
        set((state) => {
            const id = generateId();
            const newFrame = { id, ...state.frameTemplate };
            return {
                frames: {
                    ...state.frames,
                    [id]: newFrame,
                },
                frameOrder: [...state.frameOrder, id],
                activeFrameId: id,
            };
        }),

    nextFrame: () =>
        set((state) => {
            const idx = state.frameOrder.indexOf(state.activeFrameId);
            if (idx >= 0 && idx < state.frameOrder.length - 1) {
                return { activeFrameId: state.frameOrder[idx + 1] };
            }
            return {};
        }),

    prevFrame: () =>
        set((state) => {
            const idx = state.frameOrder.indexOf(state.activeFrameId);
            if (idx > 0) {
                return { activeFrameId: state.frameOrder[idx - 1] };
            }
            return {};
        }),
}));

// Keeps Zustand state across hot reloads in dev (ignored in production)
zustandHmrFix("canvasStored", useCanvasStore);
