import { useRenderLogger } from "../../hooks/useRenderLogger";
import {
    useCanvasPan,
    useCanvasScale,
} from "../../store/selectors/canvasPropertiesSelectors";
import { toViewportPoint } from "../../utils/canvasUtils";
import { HandleSquare } from "./HandleSquare.JSX";
import { getBoundingBoxHandles } from "./utils";

export const SelectionRect = ({ bounds, padding, showHandles, dashed }) => {
    const scale = useCanvasScale();
    const pan = useCanvasPan();
    const { x, y, width, height } = bounds;
    const handles = showHandles
        ? getBoundingBoxHandles(bounds, padding, scale, pan)
        : null;

    const viewportPoint = toViewportPoint(
        {
            x: x - padding,
            y: y - padding,
        },
        scale,
        pan
    );
    const newWidth = (width + padding * 2) * scale;
    const newHeight = (height + padding * 2) * scale;

    useRenderLogger("SelectionRect");

    return (
        <>
            <rect
                x={viewportPoint.x}
                y={viewportPoint.y}
                width={newWidth}
                height={newHeight}
                fill="none"
                stroke="#007AFF"
                strokeWidth={1}
                strokeDasharray={dashed ? "4 2" : "none"}
            />
            {handles &&
                Object.entries(handles).map(([key, h]) => (
                    <HandleSquare
                        key={key}
                        x={h.x}
                        y={h.y}
                        cursor={h.cursor}
                        handleId={key}
                    />
                ))}
        </>
    );
};
