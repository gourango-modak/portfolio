export const resizeText = ({ shape, scaleX, scaleY, pivot }) => {
    // Compute a uniform scale (average or min to maintain proportionality)
    const uniformScale = (scaleX + scaleY) / 2;

    // Scale font size and dimensions proportionally
    const newFontSize = shape.properties.fontSize.value * uniformScale;

    const dx = shape.x - pivot.x;
    const dy = shape.y - pivot.y;

    return {
        ...shape,
        x: pivot.x + dx * uniformScale,
        y: pivot.y + dy * uniformScale,
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
