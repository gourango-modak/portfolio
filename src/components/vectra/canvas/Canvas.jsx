import { useRef, useEffect } from "react";
import { useDrawingStore } from "../store/DrawingStoreContext";
import { useDrawingEnvironmentSetup } from "../config/useDrawingEnvironmentSetup";
import { TextInputOverlay } from "./TextInputOverlay";
import { useToolShortcuts } from "../tools/useToolShortcuts";
import { useCanvasEvents } from "./useCanvasEvents";
import { useRenderShapes } from "./useRenderShapes";

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

    // Shared context for tool events
    const context = {
        setShapes,
        setCurrentShape,
        setCurrentShapeVersion,
        setCanvasSettings,
        canvasSettings,
    };

    // Tool event handlers
    const { onPointerDown, onPointerMove, onPointerUp, onWheel } =
        useCanvasEvents(svgRef, selectedTool, toolRegistry, context);

    // Render shapes
    useRenderShapes(
        svgRef,
        shapes,
        currentShape,
        currentShapeVersion,
        canvasSettings
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
                }}
                onPointerDown={(e) => onPointerDown(e, canvasSettings)}
                onPointerMove={(e) => onPointerMove(e, canvasSettings)}
                onPointerUp={onPointerUp}
                onWheel={(e) => onWheel(e, canvasSettings)}
            />

            <TextInputOverlay
                currentShape={currentShape}
                processToolEvent={context.processToolEvent}
                toolRegistry={toolRegistry}
                selectedTool={selectedTool}
            />
        </>
    );
};
