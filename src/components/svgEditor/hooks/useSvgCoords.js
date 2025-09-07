export const useSvgCoords = (svgRef) => {
    const getSvgCoords = (e) => {
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const coords = pt.matrixTransform(svg.getScreenCTM().inverse());

        return {
            x: coords.x,
            y: coords.y,
            pressure: e.pressure,
        };
    };
    return getSvgCoords;
};
