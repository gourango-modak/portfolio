import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/toolRegistry";
import { useToolbarStore } from "../store/useToolbarStore";
import { useCanvasStore } from "../store/useCanvasStore";
import { useZoomPan } from "../hooks/useZoomPan";
import TransformLayer from "./TransformLayer";
import { useToolShortcuts } from "../hooks/useToolShortcuts";
import { useRenderLogger } from "../hooks/useRenderLogger";

const Canvas = () => {
    const canvasRef = useRef(null);
    const liveLayerRef = useRef(null);
    const toolRef = useRef(null);

    const scale = useCanvasStore((s) => s.properties.scale);
    const pan = useCanvasStore((s) => s.properties.pan);
    const canvasBgColor = useCanvasStore((s) => s.properties.canvasBgColor);
    const activeTool = useToolbarStore((s) => s.activeTool);

    useEffect(() => {
        const ToolClass = toolRegistry[activeTool];
        toolRef.current = new ToolClass(liveLayerRef);
        useToolbarStore.getState().setActiveToolInstance(toolRef.current);
        canvasRef.current.style.cursor = ToolClass.cursor;
    }, [activeTool]);

    useZoomPan(canvasRef);
    useToolShortcuts();

    const getTransformedEvent = (e) => {
        return {
            ...e,
            tx: (e.clientX - pan.x) / scale,
            ty: (e.clientY - pan.y) / scale,
        };
    };

    const handlePointerDown = (e) => {
        const tool = toolRef.current.constructor;
        if (tool.cursorDragging) {
            canvasRef.current.style.cursor = tool.cursorDragging;
        }

        toolRef.current?.onPointerDown(getTransformedEvent(e));
    };

    const handlePointerMove = (e) => {
        toolRef.current?.onPointerMove(getTransformedEvent(e));
    };

    const handlePointerUp = (e) => {
        toolRef.current?.onPointerUp(getTransformedEvent(e));
        canvasRef.current.style.cursor = toolRef.current.constructor.cursor;
    };

    useRenderLogger("Canvas");

    return (
        <svg
            ref={canvasRef}
            style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                background: canvasBgColor.value,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <TransformLayer
                liveLayerRef={liveLayerRef}
                scale={scale}
                pan={pan}
            />
        </svg>
    );
};

export default Canvas;
