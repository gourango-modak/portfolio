export const testRectHit = (shape, x, y, options = { type: "point" }) => {
    const strokeWidth = shape.properties.strokeWidth.value;
    const baseTolerance = Math.max(4, strokeWidth * 2);
    const tolerance =
        options.type === "circle"
            ? baseTolerance + (options.radius || 0)
            : baseTolerance;

    const left = shape.x;
    const right = shape.x + shape.width;
    const top = shape.y;
    const bottom = shape.y + shape.height;

    const nearLeft =
        x >= left - tolerance &&
        x <= left + tolerance &&
        y >= top - tolerance &&
        y <= bottom + tolerance;
    const nearRight =
        x >= right - tolerance &&
        x <= right + tolerance &&
        y >= top - tolerance &&
        y <= bottom + tolerance;
    const nearTop =
        y >= top - tolerance &&
        y <= top + tolerance &&
        x >= left - tolerance &&
        x <= right + tolerance;
    const nearBottom =
        y >= bottom - tolerance &&
        y <= bottom + tolerance &&
        x >= left - tolerance &&
        x <= right + tolerance;

    return nearLeft || nearRight || nearTop || nearBottom;
};
