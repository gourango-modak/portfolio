import { FRAME_TITLE_OFFSET_Y } from "../utils/frameUtils";

export const computeFramesBoundingBox = (
    frameIds,
    frames,
    includeTitleHeight = false
) => {
    if (!frameIds || frameIds.size <= 0) return null;

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    frameIds.forEach((id) => {
        const {
            x,
            y,
            width,
            height,
            properties: { strokeWidth },
        } = frames[id];

        let adjustedX = x - strokeWidth.value / 2;
        let adjustedY =
            y -
            (includeTitleHeight ? FRAME_TITLE_OFFSET_Y : 0) -
            strokeWidth.value / 2;
        let adjustedWidth = width + strokeWidth.value;
        let adjustedHeight =
            height +
            (includeTitleHeight ? FRAME_TITLE_OFFSET_Y : 0) +
            strokeWidth.value;

        minX = Math.min(minX, adjustedX);
        minY = Math.min(minY, adjustedY);
        maxX = Math.max(maxX, adjustedX + adjustedWidth);
        maxY = Math.max(maxY, adjustedY + adjustedHeight);
    });

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
};
