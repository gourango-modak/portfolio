export const resizeEndpoint = ({
    shape,
    handle,
    pointer,
    scaleX,
    scaleY,
    origin,
    endpointHandles,
    getEndpoints,
    setEndpoints,
}) => {
    const currentEndpoints = getEndpoints(shape);

    // CASE 1 — direct endpoint move
    const endpointIndex = endpointHandles.indexOf(handle);
    if (endpointIndex >= 0) {
        const newEndpoints = currentEndpoints.map((p, i) =>
            i === endpointIndex
                ? { x: pointer.x - shape.x, y: pointer.y - shape.y }
                : { ...p }
        );

        return setEndpoints(shape, newEndpoints);
    }

    // CASE 2 — bounding-box scaling
    // Get absolute endpoints
    const absEndpoints = currentEndpoints.map((p) => ({
        x: shape.x + p.x,
        y: shape.y + p.y,
    }));

    // Scale endpoints around origin (absolute)
    const scaledAbs = absEndpoints.map((p) => ({
        x: origin.x + (p.x - origin.x) * scaleX,
        y: origin.y + (p.y - origin.y) * scaleY,
    }));

    // Compute new bounding box to update shape.x/y
    const minX = Math.min(scaledAbs[0].x, scaledAbs[1].x);
    const minY = Math.min(scaledAbs[0].y, scaledAbs[1].y);

    // Normalize endpoints back to local (relative)
    const newEndpoints = scaledAbs.map((p) => ({
        x: p.x - minX,
        y: p.y - minY,
    }));

    // Return updated shape with new x/y and endpoints
    const resized = setEndpoints({ ...shape, x: minX, y: minY }, newEndpoints);

    return resized;
};
