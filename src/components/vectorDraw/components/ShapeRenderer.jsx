import { memo } from "react";
import { useShapeStore } from "./../store/useShapeStore";
import { shapeRegistry } from "../shapes/shapeRegistry";

const ShapeRenderer = memo(({ shapeId }) => {
    const shape = useShapeStore((state) => state.shapes[shapeId]);

    if (!shape) return null;

    const Renderer = shapeRegistry[shape.type];

    return <Renderer shape={shape} />;
});

export default ShapeRenderer;
