import TransformLayer from "./TransformLayer";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { SelectionOutlineLayer } from "./SelectionOutlineLayer";
import LiveDrawingLayer from "./LiveDrawingLayer";
import { useEffect, useMemo, useRef } from "react";
import { canvasPropertiesSlice } from "../store/storeUtils";
import { useCanvasCursor } from "../store/selectors/canvasPropertiesSelectors";

const InteractionOverlay = () => {
    const interactionOverlayRef = useRef(null);
    const toolRef = useRef(null);
    const cursor = useCanvasCursor();

    useEffect(() => {
        interactionOverlayRef.current.style.cursor = cursor;
    }, [cursor]);

    const getTransformedEvent = (e) => {
        const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
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
