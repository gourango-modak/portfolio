import { useEffect, useRef } from "react";
import ShapeLayer from "./ShapeLayer";
import { useRenderLogger } from "../hooks/useRenderLogger";

const TransformLayer = ({ liveLayerRef, scale, pan }) => {
    const transformRef = useRef(null);

    useEffect(() => {
        transformRef.current.setAttribute(
            "transform",
            `translate(${pan.x},${pan.y}) scale(${scale})`
        );
    }, [scale, pan]);

    useRenderLogger("TransformLayer");

    return (
        <g ref={transformRef}>
            <g ref={liveLayerRef}></g>
            <ShapeLayer />
        </g>
    );
};

export default TransformLayer;
