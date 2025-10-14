export const combineBoundingBoxes = (boundsArray) => {
    if (!Array.isArray(boundsArray) || boundsArray.length === 0) return null;

    const validBounds = boundsArray.filter(
        (b) =>
            b &&
            Number.isFinite(b.x) &&
            Number.isFinite(b.y) &&
            Number.isFinite(b.width) &&
            Number.isFinite(b.height)
    );

    if (validBounds.length === 0) return null;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    validBounds.forEach((b) => {
        minX = Math.min(minX, b.x);
        minY = Math.min(minY, b.y);
        maxX = Math.max(maxX, b.x + b.width);
        maxY = Math.max(maxY, b.y + b.height);
    });

    // If results are still invalid, return null safely
    if (!Number.isFinite(minX) || !Number.isFinite(maxX)) return null;

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
};
