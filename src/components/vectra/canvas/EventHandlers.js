export const EventHandlers = {
    createdShape: (event, { setCurrentShape }) => {
        setCurrentShape(event.shape);
    },
    updatedShape: (event, { setCurrentShape, setCurrentShapeVersion }) => {
        setCurrentShape(event.shape);
        setCurrentShapeVersion((prev) => prev + 1); // As shape mutated in place need a force re-render
    },
    finalizedShape: (event, { setShapes, setCurrentShape }) => {
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
    scale: (event, { setCanvasSettings }) => {
        setCanvasSettings((prev) => ({
            ...prev,
            scale: event.scale,
            pan: event.pan,
        }));
    },
    pan: (event, { setCanvasSettings }) => {
        setCanvasSettings((prev) => ({
            ...prev,
            pan: event.pan,
        }));
    },
    resetCurrentShape: (event, { setCurrentShape }) => {
        setCurrentShape(null);
    },
};
