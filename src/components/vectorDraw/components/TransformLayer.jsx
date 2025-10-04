import { useEffect, useRef } from "react";
import ShapeLayer from "./ShapeLayer";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { FrameLayer } from "./FrameLayer";

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
            <FrameLayer />
            <ShapeLayer />
            <g ref={liveLayerRef}></g>
        </g>
    );
};

export default TransformLayer;
