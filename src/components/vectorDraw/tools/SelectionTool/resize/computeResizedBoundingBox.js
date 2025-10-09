export function computeResizedBoundingBox(handle, boundingBox, pointer) {
    const { x, y, width, height } = boundingBox;
    let newX = x,
        newY = y,
        newW = width,
        newH = height;
    let origin = { x, y };

    const map = {
        "top-left": () => ({
            newX: pointer.x,
            newY: pointer.y,
            newW: width + (x - pointer.x),
            newH: height + (y - pointer.y),
            origin: { x: x + width, y: y + height },
        }),
        "top-right": () => ({
            newY: pointer.y,
            newW: pointer.x - x,
            newH: height + (y - pointer.y),
            origin: { x, y: y + height },
        }),
        "bottom-right": () => ({
            newW: pointer.x - x,
            newH: pointer.y - y,
            origin: { x, y },
        }),
        "bottom-left": () => ({
            newX: pointer.x,
            newW: width + (x - pointer.x),
            newH: pointer.y - y,
            origin: { x: x + width, y },
        }),
    };

    const handler = map[handle];
    if (handler) {
        const res = handler();
        newX = res.newX ?? newX;
        newY = res.newY ?? newY;
        newW = res.newW ?? newW;
        newH = res.newH ?? newH;
        origin = res.origin ?? origin;
    }

    return {
        newX,
        newY,
        newW: Math.max(1, newW),
        newH: Math.max(1, newH),
        origin,
    };
}
