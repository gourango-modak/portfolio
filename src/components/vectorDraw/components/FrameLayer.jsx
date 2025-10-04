import { memo } from "react";
import { useCanvasStore } from "../store/useCanvasStore";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { Frame } from "./Frame";
import { CANVAS_MODES } from "../canvasUtils";

export const FrameLayer = memo(() => {
    const canvasMode = useCanvasStore((s) => s.properties.mode);
    const frameOrder = useCanvasStore((s) => s.frameOrder);
    const activeFrameId = useCanvasStore((s) => s.activeFrameId);

    useRenderLogger("FramesLayer");

    if (frameOrder.length === 0) return null;

    if (canvasMode.value === CANVAS_MODES.PAGED) {
        if (!activeFrameId) return null;
        return <Frame key={activeFrameId} frameId={activeFrameId} />;
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
