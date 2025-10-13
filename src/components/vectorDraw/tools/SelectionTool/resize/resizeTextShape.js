export const resizeTextShape = ({ shape, scaleX, scaleY, origin }) => {
    // Compute a uniform scale (average or min to maintain proportionality)
    const uniformScale = (scaleX + scaleY) / 2;

    // Scale font size and dimensions proportionally
    const newFontSize = shape.properties.fontSize.value * uniformScale;

    const dx = shape.x - origin.x;
    const dy = shape.y - origin.y;

    return {
        ...shape,
        x: origin.x + dx * uniformScale,
        y: origin.y + dy * uniformScale,
        width: shape.width * uniformScale,
        height: shape.height * uniformScale,
        properties: {
            ...shape.properties,
            fontSize: {
                ...shape.properties.fontSize,
                value: newFontSize,
            },
        },
    };
};
