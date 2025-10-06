import { memo } from "react";
import { shapeRegistry } from "../shapes/shapeRegistry";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { useShapeById } from "../store/selectors/shapeSelectors";

const Shape = memo(({ shapeId }) => {
    const shape = useShapeById(shapeId);

    useRenderLogger("Shape");

    if (!shape) return null;

    const Renderer = shapeRegistry[shape.type];

    return <Renderer shape={shape} />;
});

export default Shape;
