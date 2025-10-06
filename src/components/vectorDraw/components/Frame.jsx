import { memo } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { useFrame } from "../store/selectors/frameSelectors";

export const Frame = memo(({ frameId }) => {
    const frame = useFrame(frameId);

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
