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
import { CANVAS_MODES } from "../canvasUtils";
import { INSPECTOR_PANEL_TARGETS } from "./properties/propertiesUtils";
import { TOOLS } from "../tools/toolsUtils";
import { frameSlice } from "../store/storeUtils";

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
        group: "page-related",
        Icon: StickyNote,
        useSelectedIcon: false,
        tools: [
            {
                name: "addPage",
                Icon: FilePlus2,
                action: TOOL_ACTION_TYPES.ADD_PAGE,
                visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.PAGED,
            },
            {
                name: "addCustomPage",
                Icon: FileCog,
                visible: ({ canvasMode }) => canvasMode === CANVAS_MODES.PAGED,
                panelTarget: INSPECTOR_PANEL_TARGETS.PAGE,
            },
            {
                name: "prevPage",
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
                name: "nextPage",
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
        group: "others",
        Icon: Menu,
        useSelectedIcon: false,
        tools: [
            {
                name: "canvasSettings",
                Icon: Settings,
                action: TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL,
                panelTarget: INSPECTOR_PANEL_TARGETS.CANVAS,
            },
            {
                name: "exportDrawingState",
                Icon: Download,
                action: TOOL_ACTION_TYPES.EXPORT_DRAWING_STATE,
            },
            {
                name: "importDrawingState",
                Icon: Upload,
                action: TOOL_ACTION_TYPES.IMPORT_DRAWING_STATE,
            },
            {
                name: "clearCanvas",
                Icon: Trash2,
                action: TOOL_ACTION_TYPES.CLEAR_CANVAS,
            },
            {
                name: "resetZoomAndPan",
                Icon: RotateCcw,
                action: TOOL_ACTION_TYPES.RESET_ZOOM_AND_PAN,
            },
        ],
    },
];
