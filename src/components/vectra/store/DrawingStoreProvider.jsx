import { useMemo } from "react";
import { useToolManager } from "./useToolManager";
import { useShapeManager } from "./useShapeManager";
import { useToolbar } from "./useToolbar";
import { useCanvasManager } from "./useCanvasManager";
import { DrawingStoreContext } from "./DrawingStoreContext";

export const DrawingStoreProvider = ({ children }) => {
    const toolManager = useToolManager();
    const shapeManager = useShapeManager();
    const toolbar = useToolbar();
    const canvasManager = useCanvasManager();

    // --- Serialization helpers ---
    const serialize = () => {
        return JSON.stringify(
            {
                selectedTool: toolManager.selectedTool,
                toolbarSettings: toolbar.toolbarSettings,
                toolsSettings: toolManager.toolsSettings,
                canvasSettings: canvasManager.canvasSettings,
                shapes: shapeManager.shapes.map((shape) => shape.serialize()),
            },
            null,
            2
        );
    };

    const deserialize = (jsonString) => {
        try {
            const parsed = JSON.parse(jsonString);

            if (parsed.selectedTool)
                toolManager.setSelectedTool(parsed.selectedTool);
            if (parsed.toolbarSettings)
                toolbar.setToolbarSettings(parsed.toolbarSettings);
            if (parsed.toolsSettings)
                toolManager.setToolsSettings(parsed.toolsSettings);
            if (parsed.canvasSettings)
                canvasManager.setCanvasSettings(parsed.canvasSettings);

            if (parsed.shapes) {
                const restoredShapes = parsed.shapes
                    .map((shapeData) => {
                        const ShapeClass =
                            shapeManager.shapeRegistry[shapeData.type];
                        if (ShapeClass?.deserialize)
                            return ShapeClass.deserialize(shapeData);
                        return null;
                    })
                    .filter(Boolean);
                shapeManager.setShapes(restoredShapes);
            }
        } catch (err) {
            console.error("Failed to deserialize snapshot", err);
        }
    };

    // --- Memoized context value ---
    const value = useMemo(
        () => ({
            ...toolManager,
            ...shapeManager,
            ...toolbar,
            ...canvasManager,
            serialize,
            deserialize,
        }),
        [
            toolManager.selectedTool,
            toolManager.toolsSettings,
            toolManager.toolRegistry,
            shapeManager.shapes,
            shapeManager.currentShape,
            shapeManager.currentShapeVersion,
            toolbar.toolbarSettings,
            canvasManager.canvasSettings,
        ]
    );

    return (
        <DrawingStoreContext.Provider value={value}>
            {children}
        </DrawingStoreContext.Provider>
    );
};
