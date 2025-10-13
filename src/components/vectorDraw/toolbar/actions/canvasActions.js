import { shapeSlice, canvasPropertiesSlice } from "../../store/utils";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const canvasActions = {
    [TOOL_ACTION_TYPES.CLEAR_CANVAS]: () => {
        shapeSlice.getSlice().reset();
    },
    [TOOL_ACTION_TYPES.RESET_ZOOM_AND_PAN]: () => {
        canvasPropertiesSlice.getSlice().resetViewport();
    },
};
