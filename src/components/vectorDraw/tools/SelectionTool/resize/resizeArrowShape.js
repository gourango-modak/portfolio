import { getRoughArrowPath } from "../../../utils/svgUtils";
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

    resizeShape.path = getRoughArrowPath(
        resizeShape.x1,
        resizeShape.y1,
        resizeShape.x2,
        resizeShape.y2,
        resizeShape.properties,
        resizeShape.seed
    );

    return resizeShape;
};
