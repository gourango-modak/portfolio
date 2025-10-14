import { Settings, Trash2, RotateCcw, Save, Menu } from "lucide-react";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";
import { INSPECTOR_PANEL_TARGETS } from "../components/properties/constants";

export const actionTools = {
    group: "Action Tools",
    Icon: Menu,
    useSelectedIcon: false,
    tools: [
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
            name: "Export Drawing",
            Icon: Save,
            action: TOOL_ACTION_TYPES.OPEN_EXPORT_MODAL,
            tooltipText: "Export",
        },
        {
            name: "Settings",
            Icon: Settings,
            action: TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL,
            panelTarget: INSPECTOR_PANEL_TARGETS.CANVAS,
            tooltipText: "Settings",
        },
    ],
};
