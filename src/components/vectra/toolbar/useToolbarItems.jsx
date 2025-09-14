import { useDrawingStore } from "../store/DrawingStoreContext";
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

export const useToolbarItems = () => {
    const { canvasSettings } = useDrawingStore();

    const toolbarGroups = [
        // Drag handle (no tools)
        {
            groupName: "drag",
            type: "drag",
            icon: Move,
            name: "drag",
        },

        // Pen tool as standalone
        {
            groupName: "pen",
            name: "pen",
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
                    name: "line",
                    icon: PenLine,
                    tooltip: "Line Tool",
                    action: "selectTool",
                },
                {
                    name: "arrow",
                    icon: MoveUpRight,
                    tooltip: "Arrow Tool",
                    action: "selectTool",
                },
            ],
        },

        // Text
        {
            groupName: "text",
            name: "text",
            type: "tool",
            icon: Italic,
            tooltip: "Text Tool",
            action: "selectTool",
        },

        // Pan
        {
            groupName: "pan",
            name: "pan",
            type: "tool",
            icon: Hand,
            tooltip: "Pan Tool",
            action: "selectTool",
        },

        // Eraser
        {
            groupName: "eraser",
            name: "eraser",
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

        // Palette
        {
            groupName: "color",
            name: "color",
            type: "action",
            icon: null,
            tooltip: "Palette",
            action: "openPalette",
        },
    ];

    // Filter based on conditions
    return toolbarGroups
        .filter((group) => !group.condition || group.condition(canvasSettings))
        .map((group) => ({
            ...group,
            tools: group.tools?.filter(
                (tool) => !tool.condition || tool.condition(canvasSettings)
            ),
        }));
};
