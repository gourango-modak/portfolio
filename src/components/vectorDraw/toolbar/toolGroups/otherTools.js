import {
    Settings,
    Frame,
    Hand,
    Component,
    Trash2,
    RotateCcw,
} from "lucide-react";
import { TOOL_ACTION_TYPES } from "./../config/toolActionTypes";
import { INSPECTOR_PANEL_TARGETS } from "../components/properties/constants";
import { isInfiniteCanvas } from "../utils";
import { TOOLS } from "./../../tools/constants";

export const otherTools = {
    group: "Other Tools",
    Icon: Component,
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
        {
            name: "Clear All",
            Icon: Trash2,
            action: TOOL_ACTION_TYPES.CLEAR_CANVAS,
            tooltipText: "Clear All",
        },
        {
            name: "Fit to Screen",
            Icon: RotateCcw,
            action: TOOL_ACTION_TYPES.RESET_ZOOM_AND_PAN,
            tooltipText: "Fit to Screen",
        },
        {
            name: "Settings",
            Icon: Settings,
            action: TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL,
            panelTarget: INSPECTOR_PANEL_TARGETS.CANVAS,
        },
    ],
};
