import { memo, useEffect, useRef } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import {
    useCanvasPan,
    useCanvasScale,
} from "../store/selectors/canvasPropertiesSelectors";

const TransformLayer = memo(({ children }) => {
    const transformRef = useRef(null);

    const scale = useCanvasScale();
    const pan = useCanvasPan();

    useEffect(() => {
        transformRef.current.setAttribute(
            "transform",
            `translate(${pan.x},${pan.y}) scale(${scale})`
        );
    }, [scale, pan]);

    useRenderLogger("TransformLayer");

    return (
        <g ref={transformRef} id="canvas-content">
            {children}
        </g>
    );
});

export default TransformLayer;
