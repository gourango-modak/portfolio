import { computeFrameBoundingBox } from "../boundingBox/computeFrameBoundingBox";
import { computeShapeBoundingBox } from "../boundingBox/shapeBoundingBox";
import { CANVAS_MODES } from "../constants";
import { canvasPropertiesSlice, frameSlice } from "../store/utils";

export const findContainingFrame = (bbox, frames) => {
    if (!bbox || !frames) return null;

    for (const frame of Object.values(frames)) {
        const frameBBox = computeFrameBoundingBox(frame);
        if (
            frameBBox &&
            bbox.x >= frameBBox.x &&
            bbox.y >= frameBBox.y &&
            bbox.x + bbox.width <= frameBBox.x + frameBBox.width &&
            bbox.y + bbox.height <= frameBBox.y + frameBBox.height
        ) {
            return frame.id;
        }
    }

    return null;
};

export const resolveShapeFrameId = (shape) => {
    const bbox = computeShapeBoundingBox(shape);
    const canvasMode = canvasPropertiesSlice.getSlice().properties.mode.value;

    if (canvasMode === CANVAS_MODES.PAGED) {
        const { activeFrameId } = frameSlice.getSlice();
        return activeFrameId;
    }

    const { frames } = frameSlice.getSlice();
    return findContainingFrame(bbox, frames);
};
