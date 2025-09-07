import { useToolbar } from "./context/ToolbarContext";
import { ArrowShape, PenShape, RectangleShape } from "./Shapes";
import { distance } from "./svgEditorUtils";
import { MIN_ARROW_LENGTH, PEN_OPTIONS, TOOLS } from "./svgEdtiorConfig";

export const CurrentDrawing = ({ points, currentShape }) => {
    const { eraserSize, selectedTool } = useToolbar();
    if (selectedTool === TOOLS.PEN && points.length > 0) {
        return <PenShape points={points} options={PEN_OPTIONS} />;
    } else if (selectedTool === TOOLS.ERASER && points.length > 0) {
        return (
            <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r={eraserSize / 2}
                fill="rgba(255,0,0,0.2)"
                stroke="red"
                strokeWidth="1"
            />
        );
    } else if (selectedTool === TOOLS.RECTANGLE && currentShape) {
        return (
            <RectangleShape start={currentShape.start} end={currentShape.end} />
        );
    } else if (
        selectedTool === TOOLS.ARROW &&
        currentShape &&
        distance(currentShape.start, currentShape.end) > MIN_ARROW_LENGTH
    ) {
        return <ArrowShape start={currentShape.start} end={currentShape.end} />;
    }

    return null;
};
