import { useRenderLogger } from "../../hooks/useRenderLogger";
import {
    useCanvasPan,
    useCanvasScale,
} from "../../store/selectors/canvasPropertiesSelectors";
import { toViewportPoint } from "../../utils/canvasUtils";
import { OUTLINE_COLOR } from "./constants";
import { HandleSquare } from "./HandleSquare.JSX";
import { getBoundingBoxHandles, getSelectionLines } from "./utils";

export const SelectionRect = ({ bounds, padding, showHandles, dashed }) => {
    const scale = useCanvasScale();
    const pan = useCanvasPan();
    const { x, y, width, height } = bounds;

    const viewportPoint = toViewportPoint(
        { x: x - padding, y: y - padding },
        scale,
        pan
    );

    const scaledWidth = (width + padding * 2) * scale;
    const scaledHeight = (height + padding * 2) * scale;

    const handles = showHandles
        ? getBoundingBoxHandles(bounds, padding, scale, pan)
        : null;
    const lines = getSelectionLines({
        x: viewportPoint.x,
        y: viewportPoint.y,
        width: scaledWidth,
        height: scaledHeight,
        dashed,
    });

    useRenderLogger("SelectionRect");

    return (
        <>
            {showHandles ? (
                lines.map((line, index) => <line key={index} {...line} />)
            ) : (
                <rect
                    x={viewportPoint.x}
                    y={viewportPoint.y}
                    width={scaledWidth}
                    height={scaledHeight}
                    fill="none"
                    stroke={OUTLINE_COLOR}
                    strokeWidth={1}
                    strokeDasharray={dashed ? "4 2" : "none"}
                />
            )}
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
