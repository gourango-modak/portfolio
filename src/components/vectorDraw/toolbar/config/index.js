import { primaryTools } from "./../toolGroups/primaryTools";
import { otherTools } from "./../toolGroups/otherTools";
import { pageTools } from "../toolGroups/pageTools";
import { Save } from "lucide-react";
import { TOOL_ACTION_TYPES } from "./toolActionTypes";

export const toolbarConfig = [
    ...primaryTools,
    otherTools,
    pageTools,
    {
        name: "Export Drawing",
        Icon: Save,
        action: TOOL_ACTION_TYPES.OPEN_EXPORT_MODAL,
    },
];
