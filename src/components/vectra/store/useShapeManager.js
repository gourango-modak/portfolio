import { useState } from "react";

export const useShapeManager = () => {
    const [shapes, setShapes] = useState([]);
    const [currentShape, setCurrentShape] = useState(null);
    const [currentShapeVersion, setCurrentShapeVersion] = useState(0);
    const [shapeRegistry, setShapeRegistry] = useState({});

    const registerShape = (shapeName, shapeClass) =>
        setShapeRegistry((prev) => ({ ...prev, [shapeName]: shapeClass }));

    return {
        shapes,
        setShapes,
        currentShape,
        setCurrentShape,
        currentShapeVersion,
        setCurrentShapeVersion,
        shapeRegistry,
        registerShape,
    };
};
