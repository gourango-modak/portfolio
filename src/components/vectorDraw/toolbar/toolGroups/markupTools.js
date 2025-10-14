import { Highlighter, PenIcon, Shapes } from "lucide-react";
import { TOOLS } from "../../tools/constants";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const markupTools = {
    group: "Pen & Markup",
    Icon: PenIcon,
    useSelectedIcon: true,
    tools: [
        {
            name: TOOLS.PEN,
            Icon: PenIcon,
            action: TOOL_ACTION_TYPES.SELECT_TOOL,
            tooltipText: "Pen",
        },
        {
            name: TOOLS.LASER_POINTER,
            Icon: Highlighter,
            action: TOOL_ACTION_TYPES.SELECT_TOOL,
            tooltipText: "Laser",
        },
    ],
};
