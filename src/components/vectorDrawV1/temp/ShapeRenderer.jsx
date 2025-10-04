import { useMemo } from "react";
import { shapeRegistry } from "./shapeRegistry";

const ShapeRenderer = memo(function ShapeRenderer({ shape }) {
    if (!shape) return null;

    const Renderer = shapeRegistry[shape.type];
    const isLive = shape.isDrawing || shape.isMoving;

    return useMemo(
        () => <Renderer shape={shape} isLive={isLive} />,
        [shape.version, isLive]
    );
});

export default ShapeRenderer;
