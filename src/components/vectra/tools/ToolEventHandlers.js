export const toolEventHandlers = {
    drawStart: (event, { setCurrentShape }) => {
        setCurrentShape(event.shape);
    },
    drawProgress: (event, { setCurrentShape, setForceRender }) => {
        setCurrentShape(event.shape);
        setForceRender((prev) => prev + 1); // As shape mutated in place need a force re-render
    },
    drawEnd: (event, { setShapes, setCurrentShape }) => {
        setShapes((prev) => [...prev, event.shape]);
        setCurrentShape(null);
    },
    erase: (event, { setShapes }) => {
        setShapes((prev) =>
            prev.filter(
                (s) =>
                    !s.containsPoint(event.point, { tolerance: event.radius })
            )
        );
    },
};
