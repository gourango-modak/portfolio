import { memo, useEffect, useRef } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { useCanvasStore } from "../store/useCanvasStore";

const TransformLayer = memo(({ children }) => {
    const transformRef = useRef(null);

    const scale = useCanvasStore((s) => s.properties.scale);
    const pan = useCanvasStore((s) => s.properties.pan);

    useEffect(() => {
        transformRef.current.setAttribute(
            "transform",
            `translate(${pan.x},${pan.y}) scale(${scale})`
        );
    }, [scale, pan]);

    useRenderLogger("TransformLayer");

    return <g ref={transformRef}>{children}</g>;
});

export default TransformLayer;
