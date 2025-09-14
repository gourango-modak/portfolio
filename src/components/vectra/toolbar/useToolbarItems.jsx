import {
    Pen,
    PenLine,
    MoveUpRight,
    Save,
    FolderOpen,
    ArrowRight,
    ArrowLeft,
    Move,
    Italic,
} from "lucide-react";

export const useToolbarItems = (saveAsImage) => {
    return [
        {
            name: "drag",
            type: "drag",
            icon: Move,
        },
        {
            name: "pen",
            type: "tool",
            icon: Pen,
            tooltip: "Pen Tool",
            group: "pen",
            action: "selectTool",
        },
        {
            name: "line",
            type: "tool",
            icon: PenLine,
            tooltip: "Line Tool",
            group: "line",
            action: "selectTool",
        },
        {
            name: "arrow",
            type: "tool",
            icon: MoveUpRight,
            tooltip: "Arrow Tool",
            group: "line",
            action: "selectTool",
        },
        {
            name: "text",
            type: "tool",
            icon: Italic,
            tooltip: "Text Tool",
            group: "text",
            action: "selectTool",
        },
        {
            name: "save",
            type: "action",
            icon: Save,
            tooltip: "Save Drawing",
            onClick: saveAsImage,
            group: "actions",
        },
        {
            name: "load",
            type: "action",
            icon: FolderOpen,
            tooltip: "Load Drawing",
            group: "actions",
        },
        {
            name: "next",
            type: "action",
            icon: ArrowRight,
            tooltip: "Next Page",
            group: "actions",
        },
        {
            name: "back",
            type: "action",
            icon: ArrowLeft,
            tooltip: "Previous Page",
            group: "actions",
        },
    ];
};
