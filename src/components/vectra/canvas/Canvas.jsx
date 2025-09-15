import { useRef, useEffect } from "react";
import { useDrawingEnvironmentSetup } from "../config/useDrawingEnvironmentSetup";
import { TextInputOverlay } from "./TextInputOverlay";
import { useCanvasEvents } from "./useCanvasEvents";
import { useRenderShapes } from "./useRenderShapes";
import { useCanvasZoomPan } from "./useCanvasZoomPan";
import { useToolShortcuts } from "./../tools/useToolShortcuts";
import { TOOLS } from "../tools/toolUtils";
import { useDrawingStore } from "../store/DrawingStoreContext";

export const Canvas = () => {
    const {
        selectedTool,
        toolRegistry,
        selectedToolSettings,
        shapes,
        setShapes,
        currentShape,
        setCurrentShape,
        currentShapeVersion,
        setCurrentShapeVersion,
        setCanvasSettings,
        canvasSettings,
    } = useDrawingStore();

    const svgRef = useRef();

    // Setup environment & shortcuts
    useDrawingEnvironmentSetup();
    useToolShortcuts();

    // Update active tool settings
    useEffect(() => {
        toolRegistry[selectedTool]?.updateSettings(selectedToolSettings);
    }, [selectedTool, selectedToolSettings, toolRegistry]);

    const context = {
        setShapes,
        setCurrentShape,
        setCurrentShapeVersion,
        setCanvasSettings,
        canvasSettings,
    };

    // Canvas event handlers
    const {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        getTransformedMouseEvent,
        processEvent,
    } = useCanvasEvents(svgRef, selectedTool, toolRegistry, context);

    // Render shapes
    useRenderShapes(
        svgRef,
        shapes,
        currentShape,
        currentShapeVersion,
        canvasSettings
    );

    useCanvasZoomPan(
        svgRef,
        canvasSettings,
        getTransformedMouseEvent,
        processEvent
    );

    return (
        <>
            <svg
                ref={svgRef}
                width="100%"
                height="100vh"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    backgroundColor: canvasSettings.infiniteBg,
                    touchAction: "none",
                    userSelect: "none",
                    cursor:
                        selectedTool === TOOLS.PAN.NAME ? "grab" : "default",
                }}
                onPointerDown={(e) => onPointerDown(e)}
                onPointerMove={(e) => onPointerMove(e)}
                onPointerUp={onPointerUp}
            />
            {selectedTool === TOOLS.TEXT.NAME && (
                <TextInputOverlay
                    currentShape={currentShape}
                    processEvent={processEvent}
                    toolRegistry={toolRegistry}
                    selectedTool={selectedTool}
                />
            )}
        </>
    );
};
