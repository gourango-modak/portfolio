import { create } from "zustand";
import { createShapeSlice } from "./slices/shapeSlice";
import { createPanelSlice } from "./slices/panelSlice";
import { createColorPickerSlice } from "./slices/colorPickerSlice";
import { createToolbarSlice } from "./slices/toolbarSlice";
import { createCanvasPropertiesSlice } from "./slices/canvasPropertiesSlice";
import { createFrameSlice } from "./slices/frameSlice";
import { createCommandHistorySlice } from "./slices/commandHistorySlice";
import { createCanvasObjectSlice } from "./slices/canvasObjectSlice";
import { loggerMiddleware } from "./loggerMiddleware";

export const useDrawingAppStore = create(
    loggerMiddleware(
        (set, get) => ({
            ...createShapeSlice(set, get),
            ...createPanelSlice(set, get),
            ...createColorPickerSlice(set, get),
            ...createToolbarSlice(set, get),
            ...createCanvasPropertiesSlice(set, get),
            ...createFrameSlice(set, get),
            ...createCommandHistorySlice(set, get),
            ...createCanvasObjectSlice(set, get),
        }),
        {
            sliceName: "shapeSlice", // track only specific slice
            pathPrefix: "shapes", // track specific properties like shapes/shapeOrder
        }
    )
);
