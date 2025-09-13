import { useEffect } from "react";

export const useCanvasZoomPan = (
    svgRef,
    canvasSettings,
    getTransformedMouseEvent,
    processEvent
) => {
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const ZOOM_CONFIG = {
            factor: 1.1,
            minScale: 0.2,
            maxScale: 5,
        };

        /** Compute new scale and pan to zoom at anchor point */
        const handleZoom = (event, e) => {
            const { scale, pan } = canvasSettings;
            const direction = event.deltaY < 0 ? 1 : -1;
            const newScale = Math.min(
                Math.max(
                    scale *
                        (direction > 0
                            ? ZOOM_CONFIG.factor
                            : 1 / ZOOM_CONFIG.factor),
                    ZOOM_CONFIG.minScale
                ),
                ZOOM_CONFIG.maxScale
            );

            const anchor = { x: event.lx, y: event.ly };
            const newPan = {
                x: anchor.x - (anchor.x - pan.x) * (newScale / scale),
                y: anchor.y - (anchor.y - pan.y) * (newScale / scale),
            };

            processEvent({ type: "scale", scale: newScale, pan: newPan });
        };

        /** Compute new pan based on wheel delta (with shift key horizontal scroll) */
        const handlePan = (e) => {
            const { pan } = canvasSettings;
            const deltaX = e.shiftKey ? e.deltaY : 0;
            const deltaY = e.shiftKey ? 0 : e.deltaY;

            const newPan = {
                x: pan.x - deltaX,
                y: pan.y - deltaY,
            };

            processEvent({ type: "pan", pan: newPan });
        };

        const handleWheel = (e) => {
            e.preventDefault();

            // Transform event to canvas coordinates
            const event = getTransformedMouseEvent(e);

            if (e.ctrlKey) {
                handleZoom(event, e);
            } else {
                handlePan(e);
            }
        };

        svg.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            svg.removeEventListener("wheel", handleWheel);
        };
    }, [svgRef, canvasSettings, getTransformedMouseEvent, processEvent]);
};
