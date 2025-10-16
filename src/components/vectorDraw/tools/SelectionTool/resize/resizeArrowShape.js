import { resizeEndpoint } from "./resizeEndpoint";

export const resizeArrowShape = ({
    shape,
    handle,
    pointer,
    scaleX,
    scaleY,
    origin,
}) => {
    const resizeShape = resizeEndpoint({
        shape,
        handle,
        pointer,
        scaleX,
        scaleY,
        origin,
        endpointHandles: ["line-start", "line-end"],
        getEndpoints: (arrow) => [
            { x: arrow.x1, y: arrow.y1 },
            { x: arrow.x2, y: arrow.y2 },
        ],
        setEndpoints: (arrow, [start, end]) => ({
            ...arrow,
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
        }),
    });

    return resizeShape;
};
