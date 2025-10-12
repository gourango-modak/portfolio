export const ArrowShape = ({ shape }) => {
    return (
        <g transform={`translate(${shape.x}, ${shape.y})`}>
            <path
                d={shape.path}
                stroke={shape.properties.color.value}
                strokeWidth={shape.properties.strokeWidth.value}
                fill="transparent"
            />
        </g>
    );
};
