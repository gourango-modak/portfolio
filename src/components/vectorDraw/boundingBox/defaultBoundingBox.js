export const computeBoundingBox = (shape) => {
    const { x, y, width, height } = shape;
    return { x, y, width, height };
};
