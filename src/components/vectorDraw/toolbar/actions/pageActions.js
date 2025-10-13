import { frameSlice } from "../../store/utils";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const pageActions = {
    [TOOL_ACTION_TYPES.ADD_PAGE]: () => {
        frameSlice.getSlice().addFrameFromTemplate();
    },
    [TOOL_ACTION_TYPES.PREV_PAGE]: () => {
        frameSlice.getSlice().prevFrame();
    },
    [TOOL_ACTION_TYPES.NEXT_PAGE]: () => {
        frameSlice.getSlice().nextFrame();
    },
};
