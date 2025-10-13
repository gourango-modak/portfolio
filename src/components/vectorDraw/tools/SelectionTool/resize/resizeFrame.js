export const resizeFrame = ({ frame, scaleX, scaleY, origin }) => {
    const dx = frame.x - origin.x;
    const dy = frame.y - origin.y;
    const scaledWidth = frame.width.value * scaleX;
    const scaledHeight = frame.height.value * scaleY;

    return {
        ...frame,
        x: origin.x + dx * scaleX,
        y: origin.y + dy * scaleY,
        width: { ...frame.width, value: scaledWidth },
        height: { ...frame.height, value: scaledHeight },
    };
};
