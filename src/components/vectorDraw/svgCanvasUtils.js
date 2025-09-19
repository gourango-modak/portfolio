export const isTargetInside = (target, container) => {
    return container?.contains(target) ?? false;
};

export const getSvgCanvasPointerEvent = (svgCanvasRef, e) => {
    const svg = svgCanvasRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const coords = pt.matrixTransform(svg.getScreenCTM().inverse());
    return {
        x: coords.x,
        y: coords.y,
        originalEvent: e,
    };
};
