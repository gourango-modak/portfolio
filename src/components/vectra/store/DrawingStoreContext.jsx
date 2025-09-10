// store/DrawingStoreContext.js
import { createContext, useContext, useState, useMemo } from "react";

const DrawingStoreContext = createContext(null);

export const DrawingStoreProvider = ({ children }) => {
    const [selectedTool, setSelectedTool] = useState("pen");
    const [toolbarSettings, setToolbarSettings] = useState({
        visible: true,
        orientation: "horizontal",
        position: { x: 20, y: 20 },
    });
    const [toolsSettings, setToolsSettings] = useState({
        pen: {},
    });
    const [toolRegistry, setToolRegistry] = useState({});
    const [shapeRegistry, setShapeRegistry] = useState({});
    const [shapes, setShapes] = useState([]);
    const [currentShape, setCurrentShape] = useState(null);
    const [forceRender, setForceRender] = useState(0);

    // Canvas-specific view state
    const [canvasState, setCanvasState] = useState({
        zoom: 1,
        pan: { x: 0, y: 0 },
    });

    // --- Tools & Shapes registry ---
    const registerTool = (toolName, instance) => {
        setToolRegistry((prev) => ({ ...prev, [toolName]: instance }));
    };

    const updateToolSetting = (tool, key, value) => {
        setToolsSettings((prev) => ({
            ...prev,
            [tool]: { ...prev[tool], [key]: value },
        }));
    };

    // --- Toolbar position update function ---
    const updateToolbarPosition = ({ x, y }) => {
        setToolbarSettings((prev) => ({
            ...prev,
            position: { x, y },
        }));
    };

    // --- Shapes ---
    const registerShape = (shapeName, shapeClass) =>
        setShapeRegistry((prev) => ({ ...prev, [shapeName]: shapeClass }));

    // --- Serialization ---
    const serialize = () => {
        return JSON.stringify(
            {
                selectedTool,
                toolbarSettings,
                toolsSettings,
                canvasState,
                shapes: shapes.map((shape) => shape.serialize()),
            },
            null,
            2
        );
    };

    const deserialize = (jsonString) => {
        try {
            const parsed = JSON.parse(jsonString);
            if (parsed.selectedTool) setSelectedTool(parsed.selectedTool);
            if (parsed.toolbarSettings)
                setToolbarSettings(parsed.toolbarSettings);
            if (parsed.toolsSettings) setToolsSettings(parsed.toolsSettings);
            if (parsed.canvasState) setCanvasState(parsed.canvasState);
            if (parsed.shapes) {
                // convert plain objects back to class instances
                const restoredShapes = parsed.shapes
                    .map((shapeData) => {
                        const ShapeClass = shapeRegistry[shapeData.type];
                        debugger;
                        if (
                            ShapeClass &&
                            typeof ShapeClass.deserialize === "function"
                        ) {
                            return ShapeClass.deserialize(shapeData);
                        }
                        return null; // or skip unknown types
                    })
                    .filter(Boolean);
                debugger;
                setShapes(restoredShapes);
            }
        } catch (err) {
            console.error("Failed to deserialize snapshot", err);
        }
    };

    const value = useMemo(
        () => ({
            selectedTool,
            setSelectedTool,
            toolbarSettings,
            setToolbarSettings,
            toolsSettings,
            updateToolSetting,
            selectedToolSettings: toolsSettings[selectedTool],
            toolRegistry,
            registerTool,
            shapeRegistry,
            registerShape,
            canvasState,
            setCanvasState,
            serialize,
            deserialize,
            shapes,
            setShapes,
            currentShape,
            setCurrentShape,
            forceRender,
            setForceRender,
            updateToolbarPosition,
        }),
        [
            selectedTool,
            toolbarSettings,
            toolsSettings,
            toolRegistry,
            shapeRegistry,
            canvasState,
            setForceRender,
            forceRender,
            currentShape,
            setCurrentShape,
            shapes,
            setShapes,
            updateToolbarPosition,
        ]
    );

    return (
        <DrawingStoreContext.Provider value={value}>
            {children}
        </DrawingStoreContext.Provider>
    );
};

export const useDrawingStore = () => useContext(DrawingStoreContext);
