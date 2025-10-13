import {
    ChevronLeft,
    ChevronRight,
    FileCog,
    FilePlus2,
    Save,
    StickyNote,
} from "lucide-react";
import { TOOL_ACTION_TYPES } from "./../config/toolActionTypes";
import {
    canGoNextFrame,
    canGoPrevFrame,
    hasFrame,
    isPagedCanvas,
} from "../utils";
import { INSPECTOR_PANEL_TARGETS } from "../components/properties/constants";

export const pageTools = {
    group: "Page",
    Icon: StickyNote,
    useSelectedIcon: false,
    tools: [
        {
            name: "Add Page",
            Icon: FilePlus2,
            action: TOOL_ACTION_TYPES.ADD_PAGE,
            visible: isPagedCanvas,
        },
        {
            name: "Page Settings",
            Icon: FileCog,
            visible: isPagedCanvas,
            panelTarget: INSPECTOR_PANEL_TARGETS.PAGE,
        },
        {
            name: "Export Current Page",
            Icon: Save,
            action: TOOL_ACTION_TYPES.EXPORT_CURRENT_PAGE_TO_IMAGE,
            visible: (props) => hasFrame && isPagedCanvas(props),
        },
        {
            name: "Go To Previous Page",
            Icon: ChevronLeft,
            action: TOOL_ACTION_TYPES.PREV_PAGE,
            visible: (props) => hasFrame && isPagedCanvas(props),
            disable: (props) => !canGoPrevFrame(props),
        },
        {
            name: "Go To Next Page",
            Icon: ChevronRight,
            action: TOOL_ACTION_TYPES.NEXT_PAGE,
            visible: (props) => hasFrame && isPagedCanvas(props),
            disable: (props) => !canGoNextFrame(props),
        },
    ],
    visible: isPagedCanvas,
};
