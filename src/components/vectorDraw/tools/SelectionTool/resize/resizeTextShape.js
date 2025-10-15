export const resizeTextShape = ({ shape, scaleX, scaleY, origin }) => {
    const newFontSize = shape.properties.fontSize.value * scaleX;

    const dx = shape.x - origin.x;
    const dy = shape.y - origin.y;

    return {
        ...shape,
        x: origin.x + dx * scaleX,
        y: origin.y + dy * scaleY,
        width: shape.width * scaleX,
        height: shape.height * scaleY,
        properties: {
            ...shape.properties,
            fontSize: {
                ...shape.properties.fontSize,
                value: newFontSize,
            },
        },
    };
};
