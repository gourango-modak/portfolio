export const resizeFrame = ({ frame, scaleX, scaleY, origin }) => {
    const dx = frame.x - origin.x;
    const dy = frame.y - origin.y;
    const scaledWidth = frame.width * scaleX;
    const scaledHeight = frame.height * scaleY;

    return {
        ...frame,
        x: origin.x + dx * scaleX,
        y: origin.y + dy * scaleY,
        width: scaledWidth,
        height: scaledHeight,
        properties: {
            ...frame.properties,
            width: { ...frame.properties.width, value: scaledWidth },
            height: { ...frame.properties.height, value: scaledHeight },
        },
    };
};
