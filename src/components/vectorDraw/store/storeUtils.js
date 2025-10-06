import { useDrawingAppStore } from "./store";

// Creates slice-specific getter utilities
const createSliceGetter = (sliceName) => ({
    // Returns the entire slice state
    getSlice: () => useDrawingAppStore.getState()[sliceName],

    // Returns a specific property inside the slice
    useSliceProperty: (selectorFn, equalityFn) =>
        useDrawingAppStore((state) => selectorFn(state[sliceName]), equalityFn),
});

export const textOverlaySlice = createSliceGetter("textOverlaySlice");
export const shapeSlice = createSliceGetter("shapeSlice");
export const panelSlice = createSliceGetter("panelSlice");
export const colorPickerSlice = createSliceGetter("colorPickerSlice");
export const toolbarSlice = createSliceGetter("toolbarSlice");
export const canvasPropertiesSlice = createSliceGetter("canvasPropertiesSlice");
export const frameSlice = createSliceGetter("frameSlice");
