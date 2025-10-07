import { memo } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { Frame } from "./Frame";
import { useCanvasMode } from "../store/selectors/canvasPropertiesSelectors";
import {
    useActiveFrameId,
    useFrameOrder,
} from "../store/selectors/frameSelectors";
import { CANVAS_MODES } from "../constants";

export const FrameLayer = memo(() => {
    const canvasMode = useCanvasMode();
    const frameOrder = useFrameOrder();
    const activeFrameId = useActiveFrameId();

    useRenderLogger("FramesLayer");

    if (frameOrder.length === 0) return null;

    if (canvasMode === CANVAS_MODES.PAGED) {
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
