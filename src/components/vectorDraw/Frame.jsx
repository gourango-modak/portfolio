import { memo } from "react";
import { useCanvasStore } from "./store/useCanvasStore";
import { useRenderLogger } from "./debugging/useRenderLogger";

export const Frame = memo(({ frameId, isActive }) => {
    const frame = useCanvasStore(
        (s) => s.frames[frameId],
        (a, b) => a === b
    );

    useRenderLogger("Frame");

    if (!frame) return null;

    return (
        <rect
            x={frame.x}
            y={frame.y}
            width={frame.width}
            height={frame.height}
            fill={frame.bgColor ?? "red"}
            stroke={isActive ? "blue" : "gray"}
            strokeWidth={isActive ? 2 : 1}
        />
    );
});
