import { create } from "zustand";
import { CANVAS_MODES } from "../svgCanvasUtils";
import { zustandHmrFix } from "./zustandHmrFix";

export const useCanvasStore = create((set) => ({
    mode: CANVAS_MODES.PAGED,
    frames: {},
    frameOrder: [],
    activeFrameId: null,
    bgColor: "#ffffff",
    autoFrameTemplate: null, // if set, skip modal and auto-create
    frameTemplate: {
        width: 800,
        height: 1200,
        bgColor: "#ffffff",
        x: (window.innerWidth - 800) / 2,
        y: 100,
    },
    updateFrameTemplate: (property) =>
        set((state) => ({
            frameTemplate: {
                ...state.frameTemplate,
                ...property,
            },
        })),

    setCanvasMode: (mode) =>
        set({
            mode,
        }),

    setCanvasBg: (color) =>
        set({
            bgColor: color,
        }),

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
}));

// Keeps Zustand state across hot reloads in dev (ignored in production)
zustandHmrFix("canvasStored", useCanvasStore);
