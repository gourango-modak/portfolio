export const computeFrameBoundingBox = (frame) => {
    if (!frame) return null;

    const { x, y } = frame;
    const width = frame.width.value;
    const height = frame.height.value;

    return { x, y, width, height };
};
