import { getRoughArrowPath } from "../../utils/svgUtils";

export const ArrowShape = ({ shape }) => {
    const path = getRoughArrowPath(
        shape.x1,
        shape.y1,
        shape.x2,
        shape.y2,
        shape.properties,
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
