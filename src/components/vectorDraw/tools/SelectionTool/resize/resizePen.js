export function resizePen({ object: shape, scaleX, scaleY, pivot }) {
    const originalWidth = shape.width || 0;
    const originalHeight = shape.height || 0;

    // Compute new bounding box
    const newWidth = originalWidth * scaleX;
    const newHeight = originalHeight * scaleY;

    const dx = shape.x - pivot.x;
    const dy = shape.y - pivot.y;

    // Compute new x/y based on pivot
    const newX = pivot.x + dx * scaleX;
    const newY = pivot.y + dy * scaleY;

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
