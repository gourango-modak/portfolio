import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/toolRegistry";
import { useToolbarStore } from "../store/useToolbarStore";
import { useCanvasStore } from "../store/useCanvasStore";
import { useRenderLogger } from "../hooks/useRenderLogger";

const LiveDrawingLayer = ({ toolRef }) => {
    const liveLayerRef = useRef(null);
    const activeTool = useToolbarStore((s) => s.activeTool);

    useEffect(() => {
        const ToolClass = toolRegistry[activeTool];
        toolRef.current = new ToolClass(liveLayerRef);
        useToolbarStore.getState().setActiveToolInstance(toolRef.current);
        useCanvasStore.getState().setCursor(ToolClass.cursor);
    }, [activeTool]);

    useRenderLogger("LiveDrawingLayer");

    return <g ref={liveLayerRef}></g>;
};

export default LiveDrawingLayer;
