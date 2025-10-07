import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Download,
    Eraser,
    FileCog,
    FilePlus2,
    Frame,
    Hand,
    Italic,
    Menu,
    MousePointer,
    PenIcon,
    RotateCcw,
    Settings,
    Square,
    StickyNote,
    Trash2,
    Upload,
} from "lucide-react";
import { INSPECTOR_PANEL_TARGETS } from "./properties/constants";
import { frameSlice } from "../store/utils";
import { TOOLS } from "../tools/constants";
import { CANVAS_MODES } from "../constants";

export const TOOL_ACTION_TYPES = {
    SELECT_TOOL: "SELECT_TOOL",
    OPEN_CANVAS_PROPERTIES_PANEL: "OPEN_CANVAS_PROPERTIES_PANEL",
    ADD_PAGE: "ADD_PAGE",
    PREV_PAGE: "PREV_PAGE",
    NEXT_PAGE: "NEXT_PAGE",
    IMPORT_DRAWING_STATE: "IMPORT_DRAWING_STATE",
    EXPORT_DRAWING_STATE: "EXPORT_DRAWING_STATE",
    CLEAR_CANVAS: "CLEAR_CANVAS",
    RESET_ZOOM_AND_PAN: "RESET_ZOOM_AND_PAN",
};

export const toolbarConfig = [
    {
        name: TOOLS.SELECTION,
        Icon: MousePointer,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
    {
        name: TOOLS.PEN,
        Icon: PenIcon,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
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
    {
        name: TOOLS.TEXT,
        Icon: Italic,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
    {
        name: TOOLS.ERASER,
        Icon: Eraser,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
    },
    {
        name: TOOLS.PAN,
        Icon: Hand,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        visible: () => false,
    },
    {
        name: "frameTool",
        Icon: Frame,
        action: TOOL_ACTION_TYPES.SELECT_TOOL,
        visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.INFINITE,
    },
    {
        group: "Page",
        Icon: StickyNote,
        useSelectedIcon: false,
        tools: [
            {
                name: "Add Page",
                Icon: FilePlus2,
                action: TOOL_ACTION_TYPES.ADD_PAGE,
                visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.PAGED,
            },
            {
                name: "Page Settings",
                Icon: FileCog,
                visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.PAGED,
                panelTarget: INSPECTOR_PANEL_TARGETS.PAGE,
            },
            {
                name: "Go To Previous Page",
                Icon: ChevronLeft,
                action: TOOL_ACTION_TYPES.PREV_PAGE,
                visible: ({ canvasMode }) => {
                    return (
                        frameSlice.getSlice().hasFrame() &&
                        canvasMode === CANVAS_MODES.PAGED
                    );
                },
                disable: ({ activeFrameId }) => {
                    return !frameSlice.getSlice().hasPrevFrame(activeFrameId);
                },
            },
            {
                name: "Go To Next Page",
                Icon: ChevronRight,
                action: TOOL_ACTION_TYPES.NEXT_PAGE,
                visible: ({ canvasMode }) => {
                    return (
                        frameSlice.getSlice().hasFrame() &&
                        canvasMode === CANVAS_MODES.PAGED
                    );
                },
                disable: ({ activeFrameId }) => {
                    return !frameSlice.getSlice().hasNextFrame(activeFrameId);
                },
            },
        ],
    },
    {
        group: "Others",
        Icon: Menu,
        useSelectedIcon: false,
        tools: [
            {
                name: "Settings",
                Icon: Settings,
                action: TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL,
                panelTarget: INSPECTOR_PANEL_TARGETS.CANVAS,
            },
            {
                name: "Export Drawing",
                Icon: Download,
                action: TOOL_ACTION_TYPES.EXPORT_DRAWING_STATE,
            },
            {
                name: "Import Drawing",
                Icon: Upload,
                action: TOOL_ACTION_TYPES.IMPORT_DRAWING_STATE,
            },
            {
                name: "Clear Canvas",
                Icon: Trash2,
                action: TOOL_ACTION_TYPES.CLEAR_CANVAS,
            },
            {
                name: "Reset Viewport",
                Icon: RotateCcw,
                action: TOOL_ACTION_TYPES.RESET_ZOOM_AND_PAN,
            },
        ],
    },
];
