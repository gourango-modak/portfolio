import { useEffect, useRef } from "react";
import { useToolbarStore } from "./store/useToolbarStore";
import MouseManager from "./MouseManager";
import { toolRegistry } from "./tools/toolRegistry";
import { useRenderLogger } from "./debugging/useRenderLogger";
import { getSvgCanvasPointerEvent } from "./svgCanvasUtils";
import { useCanvasStore } from "./store/useCanvasStore";
import { FramesLayer } from "./FramesLayer";

const SvgCanvas = () => {
    const svgCanvasRef = useRef(null);
    const activeTool = useToolbarStore((s) => s.activeTool);
    const canvasBgColor = useCanvasStore((s) => s.bgColor);
    const activeToolRef = useRef(activeTool);
    activeToolRef.current = activeTool;

    useEffect(() => {
        const tool = toolRegistry[activeTool];
        if (svgCanvasRef.current && tool) {
            svgCanvasRef.current.style.cursor = tool.cursor;
        }
    }, [activeTool]);

    useEffect(() => {
        if (svgCanvasRef.current) {
            svgCanvasRef.current.style.backgroundColor = canvasBgColor;
        }
    }, [canvasBgColor]);

    useEffect(() => {
        const manager = MouseManager.getInstance();
        const unsubscribe = manager.subscribe((type, e) => {
            const tool = toolRegistry[activeToolRef.current];
            if (!tool) return;

            // Map to SVG coordinates
            const event = getSvgCanvasPointerEvent(svgCanvasRef, e);

            if (type === MouseManager.EventType.DOWN) {
                console.log("SvgCanvas Down", event);
                tool.onDown?.(event);
            }
            if (type === MouseManager.EventType.MOVE) {
                console.log("SvgCanvas Move", event);
                tool.onMove?.(event);
            }
            if (type === MouseManager.EventType.UP) {
                console.log("SvgCanvas Up", event);
                tool.onUp?.(event);
            }
        }, svgCanvasRef.current);

        return () => unsubscribe();
    }, []);

    useRenderLogger("SvgCanvas");

    return (
        <svg ref={svgCanvasRef} width="100%" height="100vh">
            <FramesLayer />
        </svg>
    );
};

export default SvgCanvas;
