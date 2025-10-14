import { Frame, Hand } from "lucide-react";
import { TOOL_ACTION_TYPES } from "./../config/toolActionTypes";
import { isInfiniteCanvas } from "../utils";
import { TOOLS } from "./../../tools/constants";

export const otherTools = {
    group: "Other Tools",
    Icon: Hand,
    useSelectedIcon: true,
    tools: [
        {
            name: TOOLS.PAN,
            Icon: Hand,
            action: TOOL_ACTION_TYPES.SELECT_TOOL,
            tooltipText: "Pan",
        },
        {
            name: TOOLS.FRAME,
            Icon: Frame,
            action: TOOL_ACTION_TYPES.SELECT_TOOL,
            tooltipText: "Frame",
            visible: isInfiniteCanvas,
        },
    ],
};
