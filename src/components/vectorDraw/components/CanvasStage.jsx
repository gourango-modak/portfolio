import { useToolShortcuts } from "../hooks/useToolShortcuts";
import DrawingLayer from "./DrawingLayer";
import { FrameLayer } from "./FrameLayer";
import ShapeLayer from "./ShapeLayer";

const CanvasStage = () => {
    useToolShortcuts();

    return (
        <>
            <FrameLayer />
            <ShapeLayer />
            <DrawingLayer />
        </>
    );
};

export default CanvasStage;
