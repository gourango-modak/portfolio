import React, { useMemo } from "react";
import { useShapeStore } from "../store/useShapeStore";
import Shape from "./Shape";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { useCanvasStore } from "../store/useCanvasStore";

const ShapeLayer = () => {
    const shapeOrder = useShapeStore((s) => s.shapeOrder);
    const activeFrameId = useCanvasStore((s) => s.activeFrameId);

    const filteredShapeOrder = useMemo(() => {
        if (!activeFrameId) return shapeOrder;

        const shapes = useShapeStore.getState().shapes;
        return shapeOrder.filter((id) => shapes[id].frameId === activeFrameId);
    }, [shapeOrder, activeFrameId]);

    useRenderLogger("ShapeLayer");

    return (
        <g>
            {filteredShapeOrder.map((id) => (
                <Shape key={id} shapeId={id} />
            ))}
        </g>
    );
};

export default React.memo(ShapeLayer);
