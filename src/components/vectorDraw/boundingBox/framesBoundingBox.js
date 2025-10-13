import { computeFrameBoundingBox } from "./computeFrameBoundingBox";

export const computeFramesBoundingBox = (frameIds, frames) => {
    if (!frameIds || frameIds.size <= 0) return null;

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    frameIds.forEach((id) => {
        const { x, y, width, height } = computeFrameBoundingBox(frames[id]);

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    });

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
};
