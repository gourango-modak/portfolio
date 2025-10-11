import { useDrawingAppStore } from "./store";

// Creates slice-specific getter utilities
const createSliceGetter = (sliceName) => ({
    // Returns the entire slice state
    getSlice: () => useDrawingAppStore.getState()[sliceName],

    // Returns a specific property inside the slice
    useSliceProperty: (selectorFn, equalityFn) =>
        useDrawingAppStore((state) => selectorFn(state[sliceName]), equalityFn),
});

export const shapeSlice = createSliceGetter("shapeSlice");
export const panelSlice = createSliceGetter("panelSlice");
export const colorPickerSlice = createSliceGetter("colorPickerSlice");
export const toolbarSlice = createSliceGetter("toolbarSlice");
export const canvasPropertiesSlice = createSliceGetter("canvasPropertiesSlice");
export const frameSlice = createSliceGetter("frameSlice");
export const commandHistorySlice = createSliceGetter("commandHistorySlice");

export const serializeDrawingAppState = () => {
    return {
        canvasProperties: canvasPropertiesSlice.getSlice().serialize(),
        toolbar: toolbarSlice.getSlice().serialize(),
        shape: shapeSlice.getSlice().serialize(),
        frame: frameSlice.getSlice().serialize(),
    };
};

export const deserializeDrawingAppState = (jsonString) => {
    try {
        const data = JSON.parse(jsonString);

        data.canvasProperties &&
            canvasPropertiesSlice.getSlice().deserialize(data.canvasProperties);
        data.toolbar && toolbarSlice.getSlice().deserialize(data.toolbar);
        data.shape && shapeSlice.getSlice().deserialize(data.shape);
        data.frame && frameSlice.getSlice().deserialize(data.frame);
    } catch (err) {
        console.error("Failed to deserialize drawing app state:", err);
    }
};
