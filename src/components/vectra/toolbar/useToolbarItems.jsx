import { useDrawingStore } from "../store/DrawingStoreContext";
import { TOOLS } from "./../tools/toolUtils";
import {
    Pen,
    PenLine,
    MoveUpRight,
    Italic,
    Hand,
    Eraser,
    Save,
    FolderOpen,
    ArrowRight,
    ArrowLeft,
    Move,
    StickyNote,
} from "lucide-react";

export const useToolbarItems = (store) => {
    const toolbarGroups = [
        // Drag handle
        {
            groupName: "drag",
            type: "drag",
            icon: Move,
            name: "drag",
        },

        // Pen
        {
            groupName: "pen",
            name: TOOLS.PEN.NAME,
            type: "tool",
            icon: Pen,
            tooltip: "Pen Tool",
            action: "selectTool",
        },

        // Line + Arrow grouped
        {
            groupName: "line",
            type: "tool",
            groupIcon: MoveUpRight,
            changeGroupIcon: true,
            tools: [
                {
                    name: TOOLS.LINE.NAME,
                    icon: PenLine,
                    tooltip: "Line Tool",
                    action: "selectTool",
                },
                {
                    name: TOOLS.ARROW.NAME,
                    icon: MoveUpRight,
                    tooltip: "Arrow Tool",
                    action: "selectTool",
                },
            ],
        },

        // Text
        {
            groupName: "text",
            name: TOOLS.TEXT.NAME,
            type: "tool",
            icon: Italic,
            tooltip: "Text Tool",
            action: "selectTool",
        },

        // Pan
        {
            groupName: "pan",
            name: TOOLS.PAN.NAME,
            type: "tool",
            icon: Hand,
            tooltip: "Pan Tool",
            action: "selectTool",
        },

        // Eraser
        {
            groupName: "eraser",
            name: TOOLS.ERASER.NAME,
            type: "tool",
            icon: Eraser,
            tooltip: "Eraser Tool",
            action: "selectTool",
        },

        // Page navigation
        {
            groupName: "page",
            type: "tool",
            groupIcon: StickyNote,
            changeGroupIcon: false,
            tools: [
                {
                    name: "next",
                    icon: ArrowRight,
                    tooltip: "Next Page",
                    action: "nextPage",
                },
                {
                    name: "back",
                    icon: ArrowLeft,
                    tooltip: "Previous Page",
                    action: "previousPage",
                },
            ],
            condition: (settings) => settings.mode === "paged-artboard",
        },

        // Actions
        {
            groupName: "action",
            type: "tool",
            groupIcon: Save,
            changeGroupIcon: true,
            tools: [
                {
                    name: "save",
                    icon: Save,
                    tooltip: "Save Drawing",
                    action: "saveDrawing",
                },
                {
                    name: "load",
                    icon: FolderOpen,
                    tooltip: "Load Drawing",
                    action: "loadDrawing",
                },
            ],
        },

        // Canvas Color
        {
            groupName: "canvasColor",
            type: "action",
            icon: null,
            tooltip: "Canvas Color",
        },
    ];

    // Filter based on conditions
    return toolbarGroups
        .filter(
            (group) => !group.condition || group.condition(store.canvasSettings)
        )
        .map((group) => ({
            ...group,
            tools: group.tools?.filter(
                (tool) =>
                    !tool.condition || tool.condition(store.canvasSettings)
            ),
        }));
};
