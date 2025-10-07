import { canvasPropertiesSlice } from "../utils";

export const useCanvasBgColor = () =>
    canvasPropertiesSlice.useSliceProperty(
        (s) => s.properties.canvasBgColor.value
    );

export const useCanvasCursor = () =>
    canvasPropertiesSlice.useSliceProperty((s) => s.properties.cursor);

export const useCanvasScale = () =>
    canvasPropertiesSlice.useSliceProperty((s) => s.properties.scale);

export const useCanvasPan = () =>
    canvasPropertiesSlice.useSliceProperty((s) => s.properties.pan);

export const useCanvasMode = () =>
    canvasPropertiesSlice.useSliceProperty((s) => s.properties.mode.value);

export const useCanvasModeProperty = () =>
    canvasPropertiesSlice.useSliceProperty((s) => s.properties.mode);
