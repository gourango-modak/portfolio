import { PolylineShape } from "../shapes/polyline/PolylineShape";
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
import { TOOLS } from "../tools/toolUtils";
import { SHAPES } from "../shapes/shapeUtils";
import { CANVAS_MODES } from "./../canvas/canvasUtils";
import { useDrawingStore } from "../store/DrawingStoreContext";

export const useDrawingEnvironmentSetup = () => {
    const { registerTool, registerShape, setMode, setSelectedTool } =
        useDrawingStore();

    useEffect(() => {
        setMode(CANVAS_MODES.PAGED_CANVAS);
        setSelectedTool(TOOLS.PEN.NAME);

        // Register tools
        registerTool(TOOLS.PEN.NAME, new PenTool());
        registerTool(TOOLS.LINE.NAME, new LineTool());
        registerTool(TOOLS.ARROW.NAME, new ArrowTool());
        registerTool(TOOLS.ERASER.NAME, new EraserTool());
        registerTool(TOOLS.TEXT.NAME, new TextTool());
        registerTool(TOOLS.PAN.NAME, new PanTool());

        // Register shapes
        registerShape(SHAPES.POLYLINE.NAME, PolylineShape);
        registerShape(SHAPES.ARROW.NAME, ArrowShape);
        registerShape(SHAPES.LINE.NAME, LineShape);
        registerShape(SHAPES.TEXT.NAME, TextShape);

        // If you add new tools/shapes, just add here
    }, []);
};
