export const resizeFrame = ({ object: frame, scaleX, scaleY, pivot }) => {
    const dx = frame.x - pivot.x;
    const dy = frame.y - pivot.y;
    const scaledWidth = frame.width.value * scaleX;
    const scaledHeight = frame.height.value * scaleY;

    return {
        ...frame,
        x: pivot.x + dx * scaleX,
        y: pivot.y + dy * scaleY,
        width: { ...frame.width, value: scaledWidth },
        height: { ...frame.height, value: scaledHeight },
    };
};
