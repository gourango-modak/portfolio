import { useState, useRef } from "react";

const Draggable = ({
    children,
    handleSelector = ".drag-handle",
    defaultPosition = { x: 0, y: 0 },
}) => {
    const [position, setPosition] = useState(defaultPosition);
    const draggingRef = useRef(false);
    const dragElementRef = useRef(null);
    const offsetRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef(null);

    const handleMouseDown = (e) => {
        if (!e.target.closest(handleSelector)) return;

        draggingRef.current = true;

        const rect = dragElementRef.current.getBoundingClientRect();
        offsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!draggingRef.current || !dragElementRef.current) return;

        const elementWidth = dragElementRef.current.offsetWidth;
        const elementHeight = dragElementRef.current.offsetHeight;

        let newX = e.clientX - offsetRef.current.x;
        let newY = e.clientY - offsetRef.current.y;

        // Constrain within viewport
        newX = Math.max(0, Math.min(newX, window.innerWidth - elementWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - elementHeight));

        // Use requestAnimationFrame to throttle state updates
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
            setPosition((prev) => {
                if (prev.x === newX && prev.y === newY) return prev;
                return { x: newX, y: newY };
            });
        });
    };

    const handleMouseUp = () => {
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
                position: "absolute",
                left: position.x,
                top: position.y,
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
