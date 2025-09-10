// components/Canvas/Canvas.jsx
import { useRef, useState, useEffect } from "react";
import { useDrawingStore } from "./store/DrawingStoreContext";
import { useDrawingEnvironmentSetup } from "./config/useDrawingEnvironmentSetup";
import { toolEventHandlers } from "./tools/ToolEventHandlers";
import { TextInputOverlay } from "./TextInputOverlay";

export const Canvas = () => {
    const {
        selectedTool,
        toolRegistry,
        toolsSettings,
        selectedToolSettings,
        shapes,
        setShapes,
        currentShape,
        setCurrentShape,
        forceRender,
        setForceRender,
    } = useDrawingStore();
    const svgRef = useRef();

    useDrawingEnvironmentSetup();

    useEffect(() => {
        toolRegistry[selectedTool]?.updateSettings(selectedToolSettings);
    }, [selectedTool, toolsSettings, toolRegistry]);

    const getMouseCoords = (e) => {
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;

        const coords = pt.matrixTransform(svg.getScreenCTM().inverse());

        return {
            x: coords.x,
            y: coords.y,
            buttons: e.buttons, // include the pressed buttons
            pressure: e.pressure,
        };
    };

    const context = {
        setShapes,
        setCurrentShape,
        setForceRender,
    };

    const processToolEvent = (toolEvent) => {
        if (!toolEvent) return;
        const handler = toolEventHandlers[toolEvent.type];
        if (handler) handler(toolEvent, context);
    };

    const handlePointerDown = (e) => {
        processToolEvent(
            toolRegistry[selectedTool]?.onPointerDown(getMouseCoords(e))
        );
    };

    const handlePointerMove = (e) => {
        processToolEvent(
            toolRegistry[selectedTool]?.onPointerMove(getMouseCoords(e))
        );
    };

    const handlePointerUp = (e) => {
        processToolEvent(toolRegistry[selectedTool]?.onPointerUp());
        // if (shape) {
        //     setShapes((prev) => [...prev, shape]);
        //     // setUndoStack((prev) => [...prev, shape]);
        //     // setRedoStack([]);
        // }
        // setCurrentShape(null);
    };

    // Undo
    // const undo = () => {
    //     setUndoStack((prev) => {
    //         const newUndo = [...prev];
    //         const shape = newUndo.pop();
    //         if (shape) {
    //             setShapes((s) => s.filter((s2) => s2 !== shape));
    //             setRedoStack((r) => [...r, shape]);
    //         }
    //         return newUndo;
    //     });
    // };

    // const redo = () => {
    //     setRedoStack((prev) => {
    //         const newRedo = [...prev];
    //         const shape = newRedo.pop();
    //         if (shape) {
    //             setShapes((s) => [...s, shape]);
    //             setUndoStack((u) => [...u, shape]);
    //         }
    //         return newRedo;
    //     });
    // };

    // Render shapes
    useEffect(() => {
        const svg = svgRef.current;
        svg.innerHTML = "";
        shapes.forEach((s) => s.draw(svg, true));
        if (currentShape) currentShape.draw(svg);
    }, [shapes, currentShape, forceRender]);

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
                    backgroundColor: "#fff",
                    touchAction: "none",
                    userSelect: "none",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            />
            {/* Overlay for text input */}
            <TextInputOverlay
                currentShape={currentShape}
                processToolEvent={processToolEvent}
                toolRegistry={toolRegistry}
                selectedTool={selectedTool}
            />
        </>
    );
};
