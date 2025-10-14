import { MoveRight, Shapes, Square } from "lucide-react";
import { TOOLS } from "../../tools/constants";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const shapeTools = {
    group: "Shapes",
    Icon: Shapes,
    useSelectedIcon: true,
    tools: [
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
    ],
};
