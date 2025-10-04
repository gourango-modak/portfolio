import { useEffect, useRef } from "react";
import MouseManager from "../MouseManager";

export const useDraggable = ({
    dragHandleRef, // Element to listen for mouse down
    draggableRef, // Element that actually moves
    onPositionChange,
    initialPosition,
}) => {
    const offsetRef = useRef({ x: 0, y: 0 });
    const positionRef = useRef(initialPosition);

    useEffect(() => {
        positionRef.current = initialPosition;
    }, [initialPosition]);

    useEffect(() => {
        if (!dragHandleRef?.current) return;

        const manager = MouseManager.getInstance();

        const unsubscribe = manager.subscribe((type, e) => {
            if (type === MouseManager.EventType.DOWN) {
                offsetRef.current = {
                    x: e.clientX - positionRef.current.x,
                    y: e.clientY - positionRef.current.y,
                };
            } else if (type === MouseManager.EventType.MOVE) {
                draggableRef.current.style.left = `${
                    e.clientX - offsetRef.current.x
                }px`;
                draggableRef.current.style.top = `${
                    e.clientY - offsetRef.current.y
                }px`;
            } else if (type === MouseManager.EventType.UP) {
                positionRef.current = {
                    x: e.clientX - offsetRef.current.x,
                    y: e.clientY - offsetRef.current.y,
                };
                onPositionChange?.(positionRef.current);
            }
        }, dragHandleRef.current);

        // Initialize position
        if (draggableRef.current) {
            draggableRef.current.style.left = `${positionRef.current.x}px`;
            draggableRef.current.style.top = `${positionRef.current.y}px`;
        }

        return () => unsubscribe();
    }, [dragHandleRef, draggableRef, onPositionChange]);
};
