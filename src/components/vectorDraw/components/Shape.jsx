import { memo } from "react";
import { useShapeStore } from "../store/useShapeStore";
import { shapeRegistry } from "../shapes/shapeRegistry";
import { useRenderLogger } from "../hooks/useRenderLogger";

const Shape = memo(({ shapeId }) => {
    const shape = useShapeStore(
        (s) => s.shapes[shapeId],
        (oldShape, newShape) => oldShape?.version === newShape?.version
    );

    useRenderLogger("Shape");

    if (!shape) return null;

    const Renderer = shapeRegistry[shape.type];

    return <Renderer shape={shape} />;
});

export default Shape;
