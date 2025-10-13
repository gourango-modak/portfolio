import {
    Menu,
    Highlighter,
    Settings,
    Download,
    Upload,
    Trash2,
    RotateCcw,
    Save,
} from "lucide-react";
import { TOOLS } from "../../tools/constants";
import { TOOL_ACTION_TYPES } from "./../config/toolActionTypes";
import { INSPECTOR_PANEL_TARGETS } from "../components/properties/constants";
import { isInfiniteCanvas } from "../utils";

export const otherTools = {
    group: "Others",
    Icon: Menu,
    useSelectedIcon: false,
    tools: [
        {
            name: TOOLS.LASER_POINTER,
            Icon: Highlighter,
            action: TOOL_ACTION_TYPES.SELECT_TOOL,
        },
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
        {
            name: "Export Image",
            Icon: Save,
            action: TOOL_ACTION_TYPES.EXPORT_CANVAS_TO_IMAGE,
            visible: isInfiniteCanvas,
        },
    ],
};
