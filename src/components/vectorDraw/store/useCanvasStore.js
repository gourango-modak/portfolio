import { create } from "zustand";
import { CANVAS_MODES } from "../canvasUtils";
import { zustandHmrFix } from "./zustandHmrFix";
import { generateId } from "../../../utils/common";

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
        x: {
            value: 0,
            label: "X",
        },
        y: { value: 0, label: "Y" },
    },
};

export const useCanvasStore = create((set) => ({
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
            properties: { ...state.properties, cursor },
        })),

    setScale: (scale) =>
        set((state) => ({
            properties: { ...state.properties, scale },
        })),

    setPan: (pan) =>
        set((state) => ({
            properties: { ...state.properties, pan },
        })),

    setCanvasMode: (mode) =>
        set((state) => {
            if (state.properties.mode.value === mode) return {};

            const updatedProperties = {
                ...state.properties,
                mode: {
                    ...state.properties.mode,
                    value: mode,
                },
            };

            return {
                properties: {
                    ...updatedProperties,
                },
                ...initialFrameState,
            };
        }),

    setCanvasBg: (color) =>
        set((state) => ({
            properties: {
                ...state.properties,
                canvasBgColor: {
                    ...state.properties.canvasBgColor,
                    value: color,
                },
            },
        })),

    ...initialFrameState,
    updateFrameTemplate: (updates) =>
        set((state) => {
            const entries = Object.entries(updates).map(([key, value]) => [
                key,
                {
                    ...state.frameTemplate[key],
                    value,
                },
            ]);

            const newTemplate = {
                ...state.frameTemplate,
                ...Object.fromEntries(entries),
            };

            return { frameTemplate: newTemplate };
        }),

    setFrameBg: (frameId, color) =>
        set((state) => ({
            frames: {
                ...state.frames,
                [frameId]: {
                    ...state.frames[frameId],
                    bgColor: {
                        ...state.frames[frameId].bgColor,
                        value: color,
                    },
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
