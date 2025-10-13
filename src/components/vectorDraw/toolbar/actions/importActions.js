import {
    downloadJson,
    generateId,
    importJsonFile,
} from "../../../../utils/common";
import {
    deserializeDrawingAppState,
    serializeDrawingAppState,
} from "../../store/utils";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const importExportActions = {
    [TOOL_ACTION_TYPES.EXPORT_DRAWING_STATE]: () => {
        downloadJson(serializeDrawingAppState(), generateId());
    },

    [TOOL_ACTION_TYPES.IMPORT_DRAWING_STATE]: () => {
        importJsonFile(deserializeDrawingAppState);
    },
};
