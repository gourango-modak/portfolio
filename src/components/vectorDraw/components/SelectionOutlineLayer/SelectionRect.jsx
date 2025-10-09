import { useRenderLogger } from "../../hooks/useRenderLogger";
import { HandleSquare } from "./HandleSquare.JSX";
import { getBoundingBoxHandles } from "./utils";

export const SelectionRect = ({ bounds, padding, showHandles, dashed }) => {
    const { x, y, width, height } = bounds;
    const handles = showHandles ? getBoundingBoxHandles(bounds, padding) : null;

    useRenderLogger("SelectionRect");

    return (
        <>
            <rect
                x={x - padding}
                y={y - padding}
                width={width + padding * 2}
                height={height + padding * 2}
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
