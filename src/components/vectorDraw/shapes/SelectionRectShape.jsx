export const SelectionRectShape = ({ shape }) => {
    const { x, y, width, height } = shape.bounds;
    const padding = 4;

    return (
        <rect
            x={x}
            y={y}
            width={width + padding}
            height={height + padding}
            stroke="#007AFF"
            strokeWidth={1}
            fill="rgba(0, 122, 255, 0.1)"
            pointerEvents="none"
            strokeDasharray="4 2"
        />
    );
};
