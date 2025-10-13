export function resizePenShape({ shape, scaleX, scaleY, origin }) {
    const originalWidth = shape.width || 0;
    const originalHeight = shape.height || 0;

    // Compute new bounding box
    const newWidth = originalWidth * scaleX;
    const newHeight = originalHeight * scaleY;

    const dx = shape.x - origin.x;
    const dy = shape.y - origin.y;

    // Compute new x/y based on origin
    const newX = origin.x + dx * scaleX;
    const newY = origin.y + dy * scaleY;

    const scaledPoints = shape.points.map(({ x, y, pressure }) => ({
        x: x * scaleX,
        y: y * scaleY,
        pressure,
    }));

    return {
        ...shape,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
        points: scaledPoints,
    };
}
