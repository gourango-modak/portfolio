export const RectShape = ({ shape }) => {
    return (
        <path
            d={shape.path}
            stroke={shape.properties.color.value}
            strokeWidth={shape.properties.strokeWidth.value}
            fill="transparent"
        />
    );
};
