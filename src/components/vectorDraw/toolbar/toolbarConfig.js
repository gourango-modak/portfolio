import {
    ChevronLeft,
    ChevronRight,
    FilePlus2,
    Frame,
    PenIcon,
    PenOff,
    Settings,
    Settings2,
} from "lucide-react";
import { arrowTool } from "../tools/arrowTool";
import { lineTool } from "../tools/lineTool";
import { CANVAS_MODES } from "../svgCanvasUtils";
import { INSPECTOR_PANEL_TARGETS } from "./properties/propertiesUtils";

export const TOOL_ACTION_TYPES = {
    SELECT_TOOL: "selectTool",
    OPEN_CANVAS_PROPERTIES_PANEL: "openCanvasProperties",
    ADD_PAGE: "addPage",
    PREV_PAGE: "prevPage",
    NEXT_PAGE: "nextPage",
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
        name: "frameTool",
        Icon: Frame,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        isTool: true,
        visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.INFINITE,
    },
    {
        name: "addPage",
        Icon: FilePlus2,
        action: TOOL_ACTION_TYPES.ADD_PAGE,
        visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.PAGED,
        panelTarget: INSPECTOR_PANEL_TARGETS.PAGE,
    },
    {
        name: "prevPage",
        Icon: ChevronLeft,
        action: TOOL_ACTION_TYPES.PREV_PAGE,
        visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.PAGED,
    },
    {
        name: "nextPage",
        Icon: ChevronRight,
        action: TOOL_ACTION_TYPES.NEXT_PAGE,
        visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.PAGED,
    },
    {
        group: "canvas-related",
        Icon: Settings2,
        useSelectedIcon: false,
        tools: [
            {
                name: "canvasSettings",
                Icon: Settings,
                action: TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL,
                panelTarget: INSPECTOR_PANEL_TARGETS.CANVAS,
            },
        ],
    },
];
