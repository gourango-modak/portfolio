import { getRoughRectPath } from "../../../utils/svgUtils";

export const resizeRectShape = ({ shape, scaleX, scaleY, origin }) => {
    const dx = shape.x - origin.x;
    const dy = shape.y - origin.y;
    const scaledWidth = shape.width * scaleX;
    const scaledHeight = shape.height * scaleY;

    return {
        ...shape,
        x: origin.x + dx * scaleX,
        y: origin.y + dy * scaleY,
        width: scaledWidth,
        height: scaledHeight,
        path: getRoughRectPath(
            0,
            0,
            scaledWidth,
            scaledHeight,
            shape.properties.roughness.value,
            shape.properties.strokeWidth.value,
            shape.seed
        ),
    };
};
