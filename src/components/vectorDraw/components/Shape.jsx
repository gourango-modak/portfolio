import { memo } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { useShapeById } from "../store/selectors/shapeSelectors";
import { shapeRegistry } from "../shapes/ui/registry";

const Shape = memo(({ shapeId }) => {
    const shape = useShapeById(shapeId);

    useRenderLogger("Shape");

    if (!shape) return null;

    const Renderer = shapeRegistry[shape.type];

    return <Renderer shape={shape} />;
});

export default Shape;
