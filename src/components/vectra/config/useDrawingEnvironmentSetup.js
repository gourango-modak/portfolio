import { PolylineShape } from "../shapes/polyline/PolylineShape";
import { useDrawingStore } from "../store/DrawingStoreContext";
import { LineTool } from "./../tools/LineTool";
import { ArrowTool } from "./../tools/ArrowTool";
import { ArrowShape } from "./../shapes/line/ArrowShape";
import { LineShape } from "../shapes/line/LineShape";
import { useEffect } from "react";
import { PenTool } from "./../tools/PenTool";
import { EraserTool } from "../tools/EraserTool";
import { TextTool } from "../tools/TextTool";
import { TextShape } from "../shapes/text/TextShape";
import { PanTool } from "../tools/PanTool";

export const useDrawingEnvironmentSetup = () => {
    const { registerTool, registerShape, setMode } = useDrawingStore();

    useEffect(() => {
        setMode("infinite");

        // Register tools
        registerTool("pen", new PenTool());
        registerTool("line", new LineTool());
        registerTool("arrow", new ArrowTool());
        registerTool("eraser", new EraserTool());
        registerTool("text", new TextTool());
        registerTool("pan", new PanTool());

        // Register shapes
        registerShape("polyline", PolylineShape);
        registerShape("arrow", ArrowShape);
        registerShape("line", LineShape);
        registerShape("text", TextShape);

        // If you add new tools/shapes, just add here
    }, []);
};
