import { FRAME_TITLE_OFFSET_Y } from "../utils/frameUtils";

export const computeBoundingBox = (shape) => {
    let { x, y, width, height } = shape;

    if (shape.isFrameTitle) {
        y -= FRAME_TITLE_OFFSET_Y;
    }

    return { x, y, width, height };
};
