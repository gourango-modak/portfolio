import { useEffect } from "react";
import { isTargetInside } from "../svgCanvasUtils";
import MouseManager from "../MouseManager";

export const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const manager = MouseManager.getInstance();

        const handleMouseEvent = (type, e) => {
            if (
                type === MouseManager.EventType.DOWN &&
                !isTargetInside(e.target, ref.current)
            ) {
                callback?.(e);
            }
        };

        const unsubscribe = manager.subscribe(handleMouseEvent);

        return () => unsubscribe();
    }, [ref, callback]);
};
