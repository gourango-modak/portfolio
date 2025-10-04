import DrawingLayer from "./DrawingLayer";
import { FrameLayer } from "./FrameLayer";
import ShapeLayer from "./ShapeLayer";

const CanvasStage = () => {
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                transform: `scale(${1}) translate(${0}px, ${0}px)`,
                transformOrigin: "top left",
            }}
        >
            <FrameLayer />
            <ShapeLayer />
            <DrawingLayer />
        </div>
    );
};

export default CanvasStage;
