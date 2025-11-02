import { useEffect, useRef, useState } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { panelSlice } from "../store/utils";
import {
    usePanelOrientation,
    usePanelVisible,
    usePanelZIndex,
} from "../store/selectors/panelSelectors";
import { PANEL_INIT_POSITION_FUNCTIONS } from "../toolbar/constants";
import { PANELS } from "../constants";

export const Panel = ({
    panelId,
    children,
    handleSelector = ".drag-handle",
}) => {
    const isVisible = usePanelVisible(panelId);
    const orientation = usePanelOrientation(panelId);
    const zIndex = usePanelZIndex(panelId);

    const [position, setPosition] = useState(
        PANEL_INIT_POSITION_FUNCTIONS[panelId]({ orientation })
    );

    const { bringToFront, setPosition: setPanelPosition } =
        panelSlice.getSlice();

    const draggingRef = useRef(null);
    const dragElementRef = useRef(null);
    const offsetRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef(null);

    useEffect(() => {
        if (dragElementRef.current) {
            dragElementRef.current.style.zIndex = zIndex;
        }
    }, [zIndex]);

    useEffect(() => {
        setTimeout(() => {
            setPosition(
                PANEL_INIT_POSITION_FUNCTIONS[panelId]({ orientation })
            );
        }, 0);
    }, []);

    useEffect(() => {
        if (panelId === PANELS.TOOLBAR_PANEL) {
            setPosition(
                PANEL_INIT_POSITION_FUNCTIONS[panelId]({ orientation })
            );
        }
    }, [orientation]);

    useRenderLogger("Panel");

    const handleMouseDown = (e) => {
        // Skipped if clicking the panel close button
        if (e.target.closest(".close-btn")) return;
        if (!e.target.closest(handleSelector)) return;

        bringToFront(panelId);
        draggingRef.current = true;
        const rect = dragElementRef.current.getBoundingClientRect();
        offsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!draggingRef.current || !dragElementRef.current) return;

        const elementWidth = dragElementRef.current.offsetWidth;
        const elementHeight = dragElementRef.current.offsetHeight;

        let newX = e.clientX - offsetRef.current.x;
        let newY = e.clientY - offsetRef.current.y;

        const BUFFER = 10; // pixels from edges
        // Constrain within viewport
        newX = Math.max(
            BUFFER,
            Math.min(newX, window.innerWidth - elementWidth - BUFFER)
        );
        newY = Math.max(
            BUFFER,
            Math.min(newY, window.innerHeight - elementHeight - BUFFER)
        );

        // Use requestAnimationFrame to throttle state updates
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
            setPosition((prev) => {
                if (prev.x === newX && prev.y === newY) return prev;
                return { x: newX, y: newY };
            });
        });
    };

    const handleMouseUp = (e) => {
        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y;
        setPanelPosition(panelId, { x: newX, y: newY });

        draggingRef.current = false;
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            ref={dragElementRef}
            onMouseDown={handleMouseDown}
            style={{
                left: position.x,
                top: position.y,
            }}
            className={`absolute ${isVisible ? "visible" : "hidden"}`}
        >
            {children}
        </div>
    );
};
