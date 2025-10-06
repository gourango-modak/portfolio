import { useDrawingAppStore } from "./store";

/**
 * Creates slice-specific getter utilities
 */
const createSliceGetter = (sliceName) => ({
    // Returns the entire slice state
    getSlice: () => useDrawingAppStore.getState()[sliceName],

    /**
     * Returns a specific property inside the slice
     */
    useSliceProperty: (selectorFn) =>
        useDrawingAppStore((state) => selectorFn(state[sliceName])),
});

export const textOverlaySlice = createSliceGetter("textOverlaySlice");
export const shapeSlice = createSliceGetter("shapeSlice");
export const panelSlice = createSliceGetter("panelManagerSlice");
export const colorPickerSlice = createSliceGetter("colorPickerSlice");
export const toolbarSlice = createSliceGetter("toolbarSlice");
export const canvasPropertiesSlice = createSliceGetter("canvasPropertiesSlice");
export const framesSlice = createSliceGetter("framesSlice");
