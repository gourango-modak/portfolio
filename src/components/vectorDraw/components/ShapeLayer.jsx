import React from "react";
import { useShapeStore } from "../store/useShapeStore";
import ShapeRenderer from "./ShapeRenderer";
import { useRenderLogger } from "../hooks/useRenderLogger";

const ShapeLayer = () => {
    const shapeOrder = useShapeStore((s) => s.shapeOrder);

    useRenderLogger("ShapeLayer");

    return (
        <g>
            {shapeOrder.map((id) => (
                <ShapeRenderer key={id} shapeId={id} />
            ))}
        </g>
    );
};

export default React.memo(ShapeLayer);
