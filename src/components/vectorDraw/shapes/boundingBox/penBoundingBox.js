export const computePenBoundingBox = (shape) => {
    const xs = shape.points.map((p) => p.x);
    const ys = shape.points.map((p) => p.y);

    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    // Local bounds
    const width = maxX - minX;
    const height = maxY - minY;

    // Convert to global bounds
    return {
        x: shape.x + minX,
        y: shape.y + minY,
        width,
        height,
    };
};
