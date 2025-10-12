import TransformLayer from "./TransformLayer";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { FrameLayer } from "./FrameLayer";
import { ShapeLayer } from "./ShapeLayer";
import { useMemo } from "react";
import { useCanvasBgColor } from "../store/selectors/canvasPropertiesSelectors";

const ContentLayer = () => {
    const canvasBgColor = useCanvasBgColor();
    const transformChildren = useMemo(
        () => (
            <g id="canvas-content">
                <FrameLayer />
                <ShapeLayer />
            </g>
        ),
        []
    );

    useRenderLogger("ContentLayer");

    return (
        <svg
            style={{
                background: canvasBgColor,
            }}
            className="canvas"
        >
            <TransformLayer>{transformChildren}</TransformLayer>
        </svg>
    );
};

export default ContentLayer;
