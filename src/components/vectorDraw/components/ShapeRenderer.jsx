import { memo } from "react";
import { useShapeStore } from "./../store/useShapeStore";
import { shapeRegistry } from "../shapes/shapeRegistry";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { SelectionRect } from "./SelectionRect";

const ShapeRenderer = memo(({ shapeId }) => {
    const shape = useShapeStore(
        (s) => s.shapes[shapeId],
        (oldShape, newShape) => oldShape?.version === newShape?.version
    );
    const isSelected = useShapeStore((s) => s.selectedShapeIds.has(shapeId));

    useRenderLogger("ShapeRenderer");

    if (!shape) return null;

    const Renderer = shapeRegistry[shape.type];

    return (
        <>
            <Renderer shape={shape} isSelected={isSelected} />
            {isSelected && <SelectionRect shape={shape} />}
        </>
    );
});

export default ShapeRenderer;
