import { useCanvasStore } from "../store/useCanvasStore";
import TransformLayer from "./TransformLayer";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { SelectionOutlineLayer } from "./SelectionOutlineLayer";
import LiveDrawingLayer from "./LiveDrawingLayer";
import { useEffect, useMemo, useRef } from "react";

const InteractionOverlay = () => {
    const interactionOverlayRef = useRef(null);
    const toolRef = useRef(null);
    const cursor = useCanvasStore((s) => s.properties.cursor);

    useEffect(() => {
        interactionOverlayRef.current.style.cursor = cursor;
    }, [cursor]);

    const getTransformedEvent = (e) => {
        const scale = useCanvasStore.getState().properties.scale;
        const pan = useCanvasStore.getState().properties.pan;
        return {
            ...e,
            tx: (e.clientX - pan.x) / scale,
            ty: (e.clientY - pan.y) / scale,
        };
    };

    const handlePointerDown = (e) => {
        toolRef.current?.onPointerDown(getTransformedEvent(e));
    };

    const handlePointerMove = (e) => {
        toolRef.current?.onPointerMove(getTransformedEvent(e));
    };

    const handlePointerUp = (e) => {
        toolRef.current?.onPointerUp(getTransformedEvent(e));
    };

    const transformChildren = useMemo(
        () => (
            <>
                <LiveDrawingLayer toolRef={toolRef} />
                <SelectionOutlineLayer />
            </>
        ),
        []
    );

    useRenderLogger("InteractionOverlay");

    return (
        <svg
            ref={interactionOverlayRef}
            className="canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <TransformLayer>{transformChildren}</TransformLayer>
        </svg>
    );
};

export default InteractionOverlay;
