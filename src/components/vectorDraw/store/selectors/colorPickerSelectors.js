import { colorPickerSlice } from "../utils";

export const useColorPickerOpen = (id) =>
    colorPickerSlice.useSliceProperty((s) => s.colorPickers[id]?.isOpen);

export const useColorPickerColor = (id) =>
    colorPickerSlice.useSliceProperty((s) => s.colorPickers[id]?.color);

export const useColorPickerPosition = (id) =>
    colorPickerSlice.useSliceProperty((s) => s.colorPickers[id]?.position);
