import { useEffect, useRef } from "react";
import { toolRegistry } from "../tools/toolRegistry";
import { useToolbarStore } from "../store/useToolbarStore";

const DrawingLayer = () => {
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

    const handlePointerDown = (e) => toolRef.current?.onPointerDown(e);
    const handlePointerMove = (e) => toolRef.current?.onPointerMove(e);
    const handlePointerUp = (e) => toolRef.current?.onPointerUp(e);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                position: "absolute",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <svg
                ref={liveLayerRef}
                style={{ position: "absolute", width: "100%", height: "100%" }}
            ></svg>
        </div>
    );
};

export default DrawingLayer;
