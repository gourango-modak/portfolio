import { panelSlice } from "../../store/utils";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const exportActions = {
    [TOOL_ACTION_TYPES.OPEN_EXPORT_MODAL]: () => {
        panelSlice.getSlice().openExportPanel();
    },
};
