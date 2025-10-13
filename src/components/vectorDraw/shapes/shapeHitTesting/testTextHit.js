import { computeBoundingBox } from "../../boundingBox/defaultBoundingBox";

export const testTextHit = (shape, x, y, options = { type: "point" }) => {
    const bounds = computeBoundingBox(shape);
    if (!bounds) return false;

    const tolerance = options.type === "circle" ? options.radius || 0 : 0;

    return (
        x >= bounds.x - tolerance &&
        x <= bounds.x + bounds.width + tolerance &&
        y >= bounds.y - tolerance &&
        y <= bounds.y + bounds.height + tolerance
    );
};
