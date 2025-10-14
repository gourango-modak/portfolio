import { Upload, Save } from "lucide-react";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const exportTools = {
    group: "Export",
    Icon: Save,
    useSelectedIcon: false,
    tools: [
        {
            name: "Import Drawing",
            Icon: Upload,
            action: TOOL_ACTION_TYPES.IMPORT_DRAWING_STATE,
        },
    ],
};
