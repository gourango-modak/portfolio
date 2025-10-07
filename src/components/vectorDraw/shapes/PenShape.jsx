import { getSvgPathFromStroke } from "../svgUtils";

export const PenShape = ({ shape }) => {
    const { x, y } = shape;
    const pathData = getSvgPathFromStroke(shape.strokePoints);

    return (
        <g transform={`translate(${x}, ${y})`}>
            <path d={pathData} fill={shape.properties.color.value} />
        </g>
    );
};
