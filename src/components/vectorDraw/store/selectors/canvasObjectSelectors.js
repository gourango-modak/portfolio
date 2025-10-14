import { canvasObjectSlice } from "../utils";

export const useCanvasLastSelectedObjectId = () =>
    canvasObjectSlice.useSliceProperty((s) => s.lastSelectedId);
