export const computeArrowBoundingBox = (shape) => {
    // x1,y1,x2,y2 are stored relative to shape.x, shape.y
    const { x1, y1, x2, y2, x, y } = shape;

    // compute absolute positions
    const absX1 = x + x1;
    const absY1 = y + y1;
    const absX2 = x + x2;
    const absY2 = y + y2;

    const minX = Math.min(absX1, absX2);
    const minY = Math.min(absY1, absY2);
    const maxX = Math.max(absX1, absX2);
    const maxY = Math.max(absY1, absY2);

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
};
