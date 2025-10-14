import { MousePointer, Italic, Eraser } from "lucide-react";
import { TOOLS } from "../../tools/constants";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";
import { shapeTools } from "./shapeTools";
import { markupTools } from "./markupTools";

export const primaryTools = [
    {
        name: TOOLS.SELECTION,
        Icon: MousePointer,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        tooltipText: "Select",
    },
    markupTools,
    shapeTools,
    {
        name: TOOLS.TEXT,
        Icon: Italic,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        tooltipText: "Text",
    },
    {
        name: TOOLS.ERASER,
        Icon: Eraser,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        tooltipText: "Eraser",
    },
];
