import { textOverlaySlice } from "../utils";

export const useTextOverlayOpen = () =>
    textOverlaySlice.useSliceProperty((s) => s.isOpen);

export const useTextOverlayPosition = () =>
    textOverlaySlice.useSliceProperty((s) => s.position);

export const useTextOverlayProperties = () =>
    textOverlaySlice.useSliceProperty((s) => s.properties);
