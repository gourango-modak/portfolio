import { memo } from "react";
import { useCanvasStore } from "../store/useCanvasStore";
import { useRenderLogger } from "../hooks/useRenderLogger";

export const Frame = memo(({ frameId }) => {
    const frame = useCanvasStore((s) => s.frames[frameId]);

    useRenderLogger("Frame");

    if (!frame) return null;

    return (
        <rect
            x={frame.x.value}
            y={frame.y.value}
            width={frame.width.value}
            height={frame.height.value}
            fill={frame.bgColor.value}
        />
    );
});
