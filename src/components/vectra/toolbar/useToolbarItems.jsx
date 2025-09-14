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
        {
            groupName: "drag",
            type: "drag",
            icon: Move,
            tools: [], // no tools inside drag
        },
        {
            groupName: "pen",
            groupIcon: Pen, // main group button icon
            changeGroupIcon: true, // change icon on tool selection
            type: "tool",
            tools: [
                {
                    name: "pen",
                    icon: Pen,
                    tooltip: "Pen Tool",
                    action: "selectTool",
                },
            ],
        },
        {
            groupName: "line",
            groupIcon: MoveUpRight,
            changeGroupIcon: true,
            type: "tool",
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
        {
            groupName: "text",
            groupIcon: Italic,
            changeGroupIcon: false, // main icon remains fixed
            type: "tool",
            tools: [
                {
                    name: "text",
                    icon: Italic,
                    tooltip: "Text Tool",
                    action: "selectTool",
                },
            ],
        },
        {
            groupName: "pan",
            groupIcon: Hand,
            changeGroupIcon: false,
            type: "tool",
            tools: [
                {
                    name: "pan",
                    icon: Hand,
                    tooltip: "Pan Tool",
                    action: "selectTool",
                },
            ],
        },
        {
            groupName: "eraser",
            groupIcon: Eraser,
            changeGroupIcon: false,
            type: "tool",
            tools: [
                {
                    name: "eraser",
                    icon: Eraser,
                    tooltip: "Eraser Tool",
                    action: "selectTool",
                },
            ],
        },
        ,
        {
            groupName: "page",
            groupIcon: StickyNote,
            changeGroupIcon: false,
            type: "page",
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
        {
            groupName: "action",
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
    ];

    // Filter tools/group if needed based on canvasSettings
    return toolbarGroups
        .filter((group) => !group.condition || group.condition(canvasSettings))
        .map((group) => ({
            ...group,
            tools: group.tools.filter(
                (tool) => !tool.condition || tool.condition(canvasSettings)
            ),
        }));
};
