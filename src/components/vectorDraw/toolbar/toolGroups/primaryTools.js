import {
    MousePointer,
    PenIcon,
    Square,
    ArrowRight,
    Italic,
    Eraser,
    Hand,
    Frame,
} from "lucide-react";
import { TOOLS } from "../../tools/constants";
import { isInfiniteCanvas } from "../utils";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const primaryTools = [
    {
        name: TOOLS.SELECTION,
        Icon: MousePointer,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
    { name: TOOLS.PEN, Icon: PenIcon, action: TOOL_ACTION_TYPES.SELECT_TOOL },
    {
        name: TOOLS.RECTANGLE,
        Icon: Square,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
    {
        name: TOOLS.ARROW,
        Icon: ArrowRight,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
    { name: TOOLS.TEXT, Icon: Italic, action: TOOL_ACTION_TYPES.SELECT_TOOL },
    { name: TOOLS.ERASER, Icon: Eraser, action: TOOL_ACTION_TYPES.SELECT_TOOL },
    {
        name: TOOLS.PAN,
        Icon: Hand,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        visible: () => false,
    },
    {
        name: TOOLS.FRAME,
        Icon: Frame,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        visible: isInfiniteCanvas,
    },
];
