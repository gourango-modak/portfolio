import { memo } from "react";
import { useRenderLogger } from "./debugging/useRenderLogger";
import { Frame } from "./Frame";
import { useCanvasStore } from "./store/useCanvasStore";
import { CANVAS_MODES } from "./svgCanvasUtils";

export const FramesLayer = memo(() => {
    const mode = useCanvasStore((s) => s.mode);
    const frameOrder = useCanvasStore((s) => s.frameOrder);
    const activeFrameId = useCanvasStore((s) => s.activeFrameId);

    useRenderLogger("FramesLayer");

    if (frameOrder.length === 0) return null;

    if (mode === CANVAS_MODES.PAGED) {
        if (!activeFrameId) return null;
        return (
            <Frame
                key={activeFrameId}
                frameId={activeFrameId}
                isActive={true}
            />
        );
    }

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
