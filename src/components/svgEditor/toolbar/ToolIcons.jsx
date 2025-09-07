import {
    Pencil,
    RectangleHorizontal,
    Circle,
    ArrowUpRight,
    Type,
    Move,
    Eraser,
    ImageDown,
} from "lucide-react";
import { TOOLS } from "../svgEdtiorConfig";

export const TOOL_ICONS = {
    [TOOLS.PEN]: <Pencil size={20} />,
    [TOOLS.RECTANGLE]: <RectangleHorizontal size={20} />,
    [TOOLS.CIRCLE]: <Circle size={20} />,
    [TOOLS.ARROW]: <ArrowUpRight size={20} />,
    [TOOLS.TEXT]: <Type size={20} />,
    [TOOLS.MOVE]: <Move size={20} />,
    [TOOLS.ERASER]: <Eraser size={20} />,
};

export const SAVE_ICON = <ImageDown size={20} />;
