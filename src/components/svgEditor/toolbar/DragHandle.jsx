import { useRef } from "react";
import { useToolbar } from "../context/ToolbarContext";

export const DragHandle = ({ dragging, setDragging }) => {
    const { orientation, position, setPosition } = useToolbar();
    const offsetRef = useRef({ x: 0, y: 0 });
    const isVertical = orientation === "vertical";

    const handlePointerDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragging(true);
        offsetRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!dragging) return;
        e.stopPropagation();
        e.preventDefault();
        setPosition({
            x: e.clientX - offsetRef.current.x,
            y: e.clientY - offsetRef.current.y,
        });
    };

    const handlePointerUp = (e) => {
        if (!dragging) return;
        e.stopPropagation();
        e.preventDefault();
        setDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
                width: isVertical ? "100%" : "16px",
                height: isVertical ? "16px" : "100%",
                marginBottom: isVertical ? "6px" : 0,
                marginRight: !isVertical ? "6px" : 0,
                cursor: dragging ? "grabbing" : "grab",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#999",
            }}
        >
            ⋮⋮
        </div>
    );
};
