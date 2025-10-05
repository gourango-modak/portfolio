export const TextShape = ({ shape }) => {
    const {
        x,
        y,
        text,
        properties: { color, fontSize, fontFamily },
        isEditing, // flag to hide shape during editing
    } = shape;

    // If shape is being edited, skip rendering
    if (isEditing) return null;

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text
                x={0}
                y={0}
                fill={color.value}
                fontSize={fontSize.value}
                fontFamily={fontFamily.value}
                letterSpacing="0.0001"
            >
                {text}
            </text>
        </g>
    );
};
