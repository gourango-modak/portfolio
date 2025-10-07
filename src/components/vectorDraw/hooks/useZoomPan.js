import { useEffect } from "react";
import { canvasPropertiesSlice } from "../store/utils";

export const useZoomPan = () => {
    useEffect(() => {
        const ZOOM_CONFIG = {
            factor: 1.1,
            minScale: 0.2,
            maxScale: 15,
        };

        const handleZoom = (e) => {
            const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
            const { setScale, setPan } = canvasPropertiesSlice.getSlice();

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

            const anchor = {
                x: e.clientX,
                y: e.clientY,
            };

            const newPan = {
                x: anchor.x - (anchor.x - pan.x) * (newScale / scale),
                y: anchor.y - (anchor.y - pan.y) * (newScale / scale),
            };

            setScale(newScale);
            setPan(newPan);
        };

        const handlePan = (e) => {
            const { pan } = canvasPropertiesSlice.getSlice().properties;
            const { setPan } = canvasPropertiesSlice.getSlice();

            const deltaX = e.shiftKey ? e.deltaY : e.deltaX;
            const deltaY = e.shiftKey ? 0 : e.deltaY;

            const newPan = {
                x: pan.x - deltaX,
                y: pan.y - deltaY,
            };

            setPan(newPan);
        };

        const handleWheel = (e) => {
            e.preventDefault();
            if (e.ctrlKey) {
                handleZoom(e);
            } else {
                handlePan(e);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);
};
