import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "../utils/svgUtils";

export const PenShape = ({ shape }) => {
    const {
        x,
        y,
        properties: { color, strokeWidth, thinning, smoothing, streamline },
    } = shape;

    const strokePoints = getStroke(shape.points, {
        size: strokeWidth.value,
        thinning: thinning.value,
        smoothing: smoothing.value,
        streamline: streamline.value,
    });
    const pathData = getSvgPathFromStroke(strokePoints);

    return (
        <g transform={`translate(${x}, ${y})`}>
            <path d={pathData} fill={color.value} />
        </g>
    );
};
