import { useEffect, useRef, useState } from "react";

export const useDragHandler = (initialPosition, onPositionChange) => {
    const [dragging, setDragging] = useState(false);
    const offsetRef = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragging(true);
        offsetRef.current = {
            x: e.clientX - initialPosition.x,
            y: e.clientY - initialPosition.y,
        };
    };

    const handleMouseMove = (e) => {
        if (!dragging || e.buttons !== 1) return;
        e.stopPropagation();
        e.preventDefault();
        onPositionChange({
            x: e.clientX - offsetRef.current.x,
            y: e.clientY - offsetRef.current.y,
        });
    };

    const handleMouseUp = (e) => {
        if (!dragging) return;
        e.stopPropagation();
        e.preventDefault();
        setDragging(false);
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

    return { dragging, handleMouseDown };
};
