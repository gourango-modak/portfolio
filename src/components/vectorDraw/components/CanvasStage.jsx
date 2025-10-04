import DrawingLayer from "./DrawingLayer";
import { FrameLayer } from "./FrameLayer";
import ShapeLayer from "./ShapeLayer";

const CanvasStage = () => {
    return (
        <>
            <FrameLayer />
            <ShapeLayer />
            <DrawingLayer />
        </>
    );
};

export default CanvasStage;
