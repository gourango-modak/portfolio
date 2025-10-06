import { create } from "zustand";
import { createTextOverlaySlice } from "./slices/textOverlaySlice";
import { createShapeSlice } from "./slices/shapeSlice";
import { createPanelSlice } from "./slices/panelSlice";
import { createColorPickerSlice } from "./slices/colorPickerSlice";
import { createToolbarSlice } from "./slices/toolbarSlice";
import { createCanvasPropertiesSlice } from "./slices/canvasPropertiesSlice";
import { createFramesSlice } from "./slices/framesSlice";

export const useDrawingAppStore = create((set, get) => ({
    ...createTextOverlaySlice(set, get),
    ...createShapeSlice(set, get),
    ...createPanelSlice(set, get),
    ...createColorPickerSlice(set, get),
    ...createToolbarSlice(set, get),
    ...createCanvasPropertiesSlice(set, get),
    ...createFramesSlice(set, get),
}));
