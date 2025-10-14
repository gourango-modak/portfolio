import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/registry";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { canvasPropertiesSlice, toolbarSlice } from "../store/utils";
import { useActiveTool } from "../store/selectors/toolbarSelectors";
import { useCanvasMode } from "../store/selectors/canvasPropertiesSelectors";

const LiveDrawingLayer = ({ toolRef }) => {
    const liveLayerRef = useRef(null);
    const activeTool = useActiveTool();
    const canvasMode = useCanvasMode();

    const { setActiveToolInstance } = toolbarSlice.getSlice();
    const { setCursor } = canvasPropertiesSlice.getSlice();

    useEffect(() => {
        const ToolClass = toolRegistry[activeTool];
        toolRef.current = new ToolClass(liveLayerRef);
        setActiveToolInstance(toolRef.current);
        setCursor(ToolClass.cursor);
    }, [activeTool, canvasMode]);

    useRenderLogger("LiveDrawingLayer");

    return <g ref={liveLayerRef}></g>;
};

export default LiveDrawingLayer;
