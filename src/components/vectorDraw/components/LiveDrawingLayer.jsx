import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/toolRegistry";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { canvasPropertiesSlice, toolbarSlice } from "../store/storeUtils";
import { useActiveTool } from "../store/selectors/toolbarSelectors";

const LiveDrawingLayer = ({ toolRef }) => {
    const liveLayerRef = useRef(null);
    const activeTool = useActiveTool();

    const { setActiveToolInstance } = toolbarSlice.getSlice();
    const { setCursor } = canvasPropertiesSlice.getSlice();

    useEffect(() => {
        const ToolClass = toolRegistry[activeTool];
        toolRef.current = new ToolClass(liveLayerRef);
        setActiveToolInstance(toolRef.current);
        setCursor(ToolClass.cursor);
    }, [activeTool]);

    useRenderLogger("LiveDrawingLayer");

    return <g ref={liveLayerRef}></g>;
};

export default LiveDrawingLayer;
