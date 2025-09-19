import {
    ArrowLeft,
    ArrowRight,
    Eraser,
    Pen,
    PenIcon,
    PenOff,
    Text,
} from "lucide-react";
import { arrowTool } from "../tools/arrowTool";
import { lineTool } from "../tools/lineTool";

export const toolbarConfig = [
    {
        group: "Drawing",
        Icon: Eraser,
        useSelectedIcon: true,
        tools: [
            { name: lineTool.name, Icon: ArrowLeft },
            { name: "ArrowLeft", Icon: ArrowRight },
            { name: "ArrowLeft2", Icon: ArrowRight },
        ],
        // tools: [
        //     { name: "Pen", Icon: Pen },
        //     { name: "Line", Icon: PenLine },
        //     { name: "ArrowRight", Icon: ArrowRight },
        //     { name: "ArrowLeft", Icon: ArrowLeft },
        // ],
    },
    { name: arrowTool.name, Icon: PenIcon },
    { name: "test", Icon: PenOff },
    { name: "test2", Icon: Text },
    { name: "test3", Icon: PenOff },
    { name: "test4", Icon: Text },
    { name: "test5", Icon: PenOff },
    { name: "test6", Icon: Text },
    { name: "test7", Icon: PenOff },
    { name: "test8", Icon: Text },
    // {
    //     group: "Edit",
    //     Icon: Eraser,
    //     useSelectedIcon: false,
    //     tools: [
    //         { name: "Hand", Icon: Hand },
    //         { name: "Eraser", Icon: Eraser },
    //         { name: "StickyNote", Icon: StickyNote },
    //     ],
    // },
    // { name: "Undo", Icon: MoveUpRight },
    // {
    //     group: "File",
    //     Icon: Save,
    //     useSelectedIcon: true,
    //     tools: [
    //         { name: "Save", Icon: Save },
    //         { name: "FolderOpen", Icon: FolderOpen },
    //     ],
    // },
    // { name: "Italic", Icon: Italic },
];
