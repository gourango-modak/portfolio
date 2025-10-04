import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/toolRegistry";
import { useToolbarStore } from "../store/useToolbarStore";
import { useCanvasStore } from "../store/useCanvasStore";
import { useZoomPan } from "../hooks/useZoomPan";

const DrawingLayer = () => {
    const canvasRef = useRef(null);
    const scale = useCanvasStore((s) => s.properties.scale);
    const pan = useCanvasStore((s) => s.properties.pan);

    const activeTool = useToolbarStore((s) => s.activeTool);
    const setActiveToolInstance = useToolbarStore(
        (s) => s.setActiveToolInstance
    );

    const liveLayerRef = useRef(null);
    const toolRef = useRef(null);

    useEffect(() => {
        const ToolClass = toolRegistry[activeTool];
        toolRef.current = new ToolClass(liveLayerRef);
        setActiveToolInstance(toolRef.current);
    }, [activeTool]);

    useZoomPan(canvasRef);

    const getTransformedEvent = (e) => {
        return {
            ...e,
            clientX: (e.clientX - pan.x) / scale,
            clientY: (e.clientY - pan.y) / scale,
        };
    };

    const handlePointerDown = (e) =>
        toolRef.current?.onPointerDown(getTransformedEvent(e));
    const handlePointerMove = (e) =>
        toolRef.current?.onPointerMove(getTransformedEvent(e));
    const handlePointerUp = (e) =>
        toolRef.current?.onPointerUp(getTransformedEvent(e));

    return (
        <svg
            ref={canvasRef}
            style={{ position: "absolute", width: "100%", height: "100vh" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <g
                ref={liveLayerRef}
                transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}
            ></g>
        </svg>
    );
};

export default DrawingLayer;
