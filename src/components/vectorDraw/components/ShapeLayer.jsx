import { memo, useMemo } from "react";
import Shape from "./Shape";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { shapeSlice } from "../store/utils";
import { useActiveFrameId } from "../store/selectors/frameSelectors";
import { useShapeOrder } from "../store/selectors/shapeSelectors";
import { useCanvasMode } from "../store/selectors/canvasPropertiesSelectors";
import { CANVAS_MODES } from "../constants";

export const ShapeLayer = memo(() => {
    const shapeOrder = useShapeOrder();
    const activeFrameId = useActiveFrameId();
    const canvasMode = useCanvasMode();

    const filteredShapeOrder = useMemo(() => {
        if (canvasMode === CANVAS_MODES.PAGED) {
            if (!activeFrameId) return shapeOrder;

            const { shapes } = shapeSlice.getSlice();
            return shapeOrder.filter(
                (id) => shapes[id].frameId === activeFrameId
            );
        }

        return shapeOrder;
    }, [shapeOrder, activeFrameId]);

    useRenderLogger("ShapeLayer");

    return (
        <g>
            {filteredShapeOrder.map((id) => (
                <Shape key={id} shapeId={id} />
            ))}
        </g>
    );
});
