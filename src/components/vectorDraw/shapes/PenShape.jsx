import { getSvgPathFromStroke } from "../canvasUtils";

export const PenShape = ({ shape }) => {
    const pathData = getSvgPathFromStroke(shape.strokePoints);
    return <path d={pathData} fill={shape.properties.color.value} />;
};
