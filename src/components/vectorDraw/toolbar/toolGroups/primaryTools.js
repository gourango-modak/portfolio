import { MousePointer, Italic, Eraser, Square, MoveRight } from "lucide-react";
import { TOOLS } from "../../tools/constants";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";
import { markupTools } from "./markupTools";

export const primaryTools = [
    {
        name: TOOLS.SELECTION,
        Icon: MousePointer,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        tooltipText: "Select",
    },
    markupTools,
    {
        name: TOOLS.RECTANGLE,
        Icon: Square,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
    {
        name: TOOLS.ARROW,
        Icon: MoveRight,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
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
