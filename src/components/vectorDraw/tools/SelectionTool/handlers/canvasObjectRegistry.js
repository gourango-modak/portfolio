import { ShapeHandler } from "./ShapeHandler";
import { FrameHandler } from "./FrameHandler";

export const canvasObjectRegistry = {
    SHAPE: new ShapeHandler("SHAPE"),
    FRAME: new FrameHandler("FRAME"),
};
