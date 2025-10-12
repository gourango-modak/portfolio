import { getRoughRectPath } from "../../../utils/svgUtils";

export const resizeRectangle = ({ object: shape, scaleX, scaleY, pivot }) => {
    const dx = shape.x - pivot.x;
    const dy = shape.y - pivot.y;
    const scaledWidth = shape.width * scaleX;
    const scaledHeight = shape.height * scaleY;

    return {
        ...shape,
        x: pivot.x + dx * scaleX,
        y: pivot.y + dy * scaleY,
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
