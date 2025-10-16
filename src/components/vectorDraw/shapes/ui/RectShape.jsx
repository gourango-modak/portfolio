import { getRoughRectPath } from "../../utils/svgUtils";

export const RectShape = ({ shape }) => {
    const path = getRoughRectPath(
        0,
        0,
        shape.width,
        shape.height,
        shape.properties.roughness.value,
        shape.properties.strokeWidth.value,
        shape.seed
    );
    return (
        <g transform={`translate(${shape.x}, ${shape.y})`}>
            <path
                d={path}
                stroke={shape.properties.color.value}
                strokeWidth={shape.properties.strokeWidth.value}
                fill="transparent"
            />
        </g>
    );
};
