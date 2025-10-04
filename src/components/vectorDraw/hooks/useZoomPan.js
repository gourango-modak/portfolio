import { useEffect } from "react";
import { useCanvasStore } from "../store/useCanvasStore";

export const useZoomPan = (viewportRef) => {
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const ZOOM_CONFIG = {
            factor: 1.1,
            minScale: 0.2,
            maxScale: 15,
        };

        const handleZoom = (e) => {
            const canvasStore = useCanvasStore.getState();
            const { scale, pan } = canvasStore.properties;

            const direction = e.deltaY < 0 ? 1 : -1;
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

            const rect = viewport.getBoundingClientRect();
            const anchor = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            const newPan = {
                x: anchor.x - (anchor.x - pan.x) * (newScale / scale),
                y: anchor.y - (anchor.y - pan.y) * (newScale / scale),
            };

            canvasStore.setScale(newScale);
            canvasStore.setPan(newPan);
        };

        const handlePan = (e) => {
            const canvasStore = useCanvasStore.getState();
            const { pan } = canvasStore.properties;

            const deltaX = e.shiftKey ? e.deltaY : e.deltaX;
            const deltaY = e.shiftKey ? 0 : e.deltaY;

            const newPan = {
                x: pan.x - deltaX,
                y: pan.y - deltaY,
            };

            canvasStore.setPan(newPan);
        };

        const handleWheel = (e) => {
            e.preventDefault();
            if (e.ctrlKey) {
                handleZoom(e);
            } else {
                handlePan(e);
            }
        };

        viewport.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            viewport.removeEventListener("wheel", handleWheel);
        };
    }, [viewportRef]);
};
