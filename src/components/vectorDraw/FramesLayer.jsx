import { memo } from "react";
import { useRenderLogger } from "./debugging/useRenderLogger";
import { Frame } from "./Frame";
import { useCanvasStore } from "./store/useCanvasStore";

export const FramesLayer = memo(() => {
    const frameOrder = useCanvasStore((s) => s.frameOrder);
    const activeFrameId = useCanvasStore((s) => s.activeFrameId);

    useRenderLogger("FramesLayer");

    if (frameOrder.length === 0) return null;

    return (
        <>
            {frameOrder.map((frameId) => (
                <Frame
                    key={frameId}
                    frameId={frameId}
                    isActive={frameId === activeFrameId}
                />
            ))}
        </>
    );
});
