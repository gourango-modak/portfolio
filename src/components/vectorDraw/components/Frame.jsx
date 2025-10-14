import { memo } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { useFrame } from "../store/selectors/frameSelectors";

export const Frame = memo(({ frameId }) => {
    const frame = useFrame(frameId);

    useRenderLogger("Frame");

    if (!frame) return null;

    return (
        <rect
            x={frame.x}
            y={frame.y}
            width={frame.width}
            height={frame.height}
            fill={frame.properties.bgColor.value}
            stroke={frame.properties.borderColor.value}
            strokeWidth={frame.properties.strokeWidth.value}
        />
    );
});
