import { getShapeBoundingRect } from "../canvasUtils";

export const SelectionRect = ({ shape }) => {
    const { x, y, width, height } = getShapeBoundingRect(shape);
    const padding = 4;

    return (
        <rect
            x={x - padding}
            y={y - padding}
            width={width + 2 * padding}
            height={height + 2 * padding}
            stroke="#007AFF"
            fill="none"
            strokeWidth={1}
        />
    );
};
