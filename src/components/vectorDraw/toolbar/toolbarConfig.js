import {
    ChevronLeft,
    ChevronRight,
    PenIcon,
    PenOff,
    Settings,
    Settings2,
} from "lucide-react";
import { arrowTool } from "../tools/arrowTool";
import { lineTool } from "../tools/lineTool";
import { CANVAS_MODES } from "../svgCanvasUtils";

export const TOOL_ACTION_TYPES = {
    SELECT_TOOL: "selectTool",
    OPEN_TOOL_SETTINGS: "openToolSettings",
    OPEN_CANVAS_SETTINGS: "openCanvasSettings",
    PREV_FRAME: "prevFrame",
    NEXT_FRAME: "nextFrame",
};

export const toolbarConfig = [
    {
        name: arrowTool.name,
        Icon: PenIcon,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        isTool: true,
    },
    {
        name: lineTool.name,
        Icon: PenOff,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        isTool: true,
    },
    {
        group: "canvas-related",
        Icon: Settings2,
        useSelectedIcon: false,
        tools: [
            {
                name: "prevFrame",
                Icon: ChevronLeft,
                action: TOOL_ACTION_TYPES.SELECT_TOOL,
                visible: ({ canvasMode }) =>
                    canvasMode === CANVAS_MODES.PAGED_FRAME,
            },
            {
                name: "nextFrame",
                Icon: ChevronRight,
                action: TOOL_ACTION_TYPES.SELECT_TOOL,
                visible: ({ canvasMode }) =>
                    canvasMode === CANVAS_MODES.PAGED_FRAME,
            },
            {
                name: "canvasSettings",
                Icon: Settings,
                action: TOOL_ACTION_TYPES.OPEN_CANVAS_SETTINGS,
            },
        ],
    },
];
