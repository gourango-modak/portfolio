import React, { useRef, useEffect } from "react";
import { usePanelStore } from "./store/usePanelStore";
import MouseManager from "./MouseManager";
import { useRenderLogger } from "./debugging/useRenderLogger";

export const PanelWrapper = ({ panelId, children, dragHandleRef }) => {
    const ref = useRef(null);

    const isVisible = usePanelStore((s) => s.panels[panelId].isVisible);
    const position = usePanelStore((s) => s.panels[panelId].position);
    const bringToFront = usePanelStore((s) => s.bringToFront);
    const setPosition = usePanelStore((s) => s.setPosition);
    const zIndex = usePanelStore((s) => s.getZIndex(panelId));

    const offsetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (ref.current) {
            ref.current.style.left = `${position.x}px`;
            ref.current.style.top = `${position.y}px`;
            ref.current.style.zIndex = zIndex;
        }
    }, [position, zIndex]);

    useRenderLogger("PanelWrapper");

    useEffect(() => {
        if (!dragHandleRef?.current) return;
        const handleEl = dragHandleRef.current;
        const manager = MouseManager.getInstance();

        const unsubscribe = manager.subscribe((type, e) => {
            if (type === MouseManager.EventType.DOWN) {
                const rect = ref.current.getBoundingClientRect();
                offsetRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            } else if (type === MouseManager.EventType.MOVE) {
                const newX = e.clientX - offsetRef.current.x;
                const newY = e.clientY - offsetRef.current.y;
                ref.current.style.left = `${newX}px`;
                ref.current.style.top = `${newY}px`;
            } else if (type === MouseManager.EventType.UP) {
                const newX = e.clientX - offsetRef.current.x;
                const newY = e.clientY - offsetRef.current.y;
                setPosition(panelId, { x: newX, y: newY });
            }
        }, handleEl);

        return () => unsubscribe();
    }, [dragHandleRef, panelId, bringToFront, setPosition]);

    return (
        <div
            ref={ref}
            className={`absolute select-none ${
                isVisible ? "visible" : "invisible"
            }`}
            onMouseDown={() => bringToFront(panelId)}
        >
            {React.isValidElement(children)
                ? React.cloneElement(children, {
                      dragHandleRef,
                      panelId,
                  })
                : children}
        </div>
    );
};
