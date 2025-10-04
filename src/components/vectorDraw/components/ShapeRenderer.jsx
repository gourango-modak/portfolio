import { memo } from "react";
import { useShapeStore } from "./../store/useShapeStore";
import { shapeRegistry } from "../shapes/shapeRegistry";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { SelectionRectShape } from "../shapes/SelectionRectShape";

const ShapeRenderer = memo(({ shapeId }) => {
    const shape = useShapeStore((s) => s.shapes[shapeId]);
    const isSelected = useShapeStore((s) => s.selectedShapeIds.has(shapeId));

    useRenderLogger("ShapeRenderer");

    if (!shape) return null;

    const Renderer = shapeRegistry[shape.type];

    return (
        <>
            <Renderer shape={shape} isSelected={isSelected} />
            {isSelected && <SelectionRectShape shape={shape} />}
        </>
    );
});

export default ShapeRenderer;
