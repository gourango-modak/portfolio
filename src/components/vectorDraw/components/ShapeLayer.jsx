import React, { useMemo } from "react";
import Shape from "./Shape";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { shapeSlice } from "../store/utils";
import { useActiveFrameId } from "../store/selectors/frameSelectors";
import { useShapeOrder } from "../store/selectors/shapeSelectors";

const ShapeLayer = () => {
    const shapeOrder = useShapeOrder();
    const activeFrameId = useActiveFrameId();

    const filteredShapeOrder = useMemo(() => {
        if (!activeFrameId) return shapeOrder;

        const { shapes } = shapeSlice.getSlice();
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
