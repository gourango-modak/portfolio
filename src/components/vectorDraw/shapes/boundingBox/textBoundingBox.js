let _measureCanvas = null;
let _measureCtx = null;

export const computeTextBoundingBox = (shape) => {
    const { x, y, text, properties } = shape;
    const { fontSize, fontFamily } = properties;

    // Create the shared offscreen canvas only once
    if (!_measureCanvas) {
        _measureCanvas = document.createElement("canvas");
        _measureCtx = _measureCanvas.getContext("2d");
    }

    const ctx = _measureCtx;
    ctx.font = `${fontSize.value}px ${fontFamily.value}`;

    const metrics = ctx.measureText(text);

    const width = metrics.width;
    const ascent = metrics.actualBoundingBoxAscent;
    const descent = metrics.actualBoundingBoxDescent;
    const height = ascent + descent;

    // Adjust Y to top-left corner (SVG text is baseline-aligned)
    const adjustedY = y - ascent;

    return {
        x,
        y: adjustedY,
        width,
        height,
    };
};
