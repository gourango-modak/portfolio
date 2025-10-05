import { useCanvasStore } from "../store/useCanvasStore";
import TransformLayer from "./TransformLayer";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { FrameLayer } from "./FrameLayer";
import ShapeLayer from "./ShapeLayer";
import { useMemo } from "react";

const ContentLayer = () => {
    const canvasBgColor = useCanvasStore((s) => s.properties.canvasBgColor);
    const transformChildren = useMemo(
        () => (
            <>
                <FrameLayer />
                <ShapeLayer />
            </>
        ),
        []
    );

    useRenderLogger("ContentLayer");

    return (
        <svg
            style={{
                background: canvasBgColor.value,
            }}
            className="canvas"
        >
            <TransformLayer>{transformChildren}</TransformLayer>
        </svg>
    );
};

export default ContentLayer;
