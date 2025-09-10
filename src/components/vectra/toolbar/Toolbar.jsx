import { useState, useRef, useEffect } from "react";
import { useDrawingStore } from "../store/DrawingStoreContext";
import { useToolbarItems } from "./useToolbarItems";

export const Toolbar = ({ saveAsImage }) => {
    const { toolbarSettings, selectedTool, updateToolbarPosition } =
        useDrawingStore();
    const { visible, position, orientation } = toolbarSettings;
    const [dragging, setDragging] = useState(false);
    const draggingOffsetRef = useRef({ x: 0, y: 0 });

    const items = useToolbarItems(saveAsImage);

    if (!visible) return null;

    const isVertical = orientation === "vertical";

    // --- Drag handlers ---
    const handleMouseDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragging(true);
        draggingOffsetRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        if (e.buttons !== 1) return;
        e.stopPropagation();
        e.preventDefault();
        updateToolbarPosition({
            x: e.clientX - draggingOffsetRef.current.x,
            y: e.clientY - draggingOffsetRef.current.y,
        });
    };

    const handleMouseUp = (e) => {
        if (!dragging) return;
        e.stopPropagation();
        e.preventDefault();
        setDragging(false);
    };

    // Attach global mousemove & mouseup when dragging
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

    const groupedItems = items.reduce((acc, item) => {
        const group = item.group || "ungrouped";
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {});

    return (
        <div
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                zIndex: 1000,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: isVertical ? "column" : "row",
                alignItems: "center",
                padding: "8px 12px",
                userSelect: "none",
                width: isVertical ? "56px" : "auto",
                height: isVertical ? "auto" : "56px",
                gap: "8px",
            }}
        >
            {Object.values(groupedItems).map((group, idx) => (
                <div
                    key={idx}
                    style={{
                        display: "flex",
                        flexDirection: isVertical ? "column" : "row",
                        gap: "6px",
                    }}
                >
                    {group.map((item) =>
                        item.render(
                            selectedTool,
                            item.draggable
                                ? { onMouseDown: handleMouseDown }
                                : null
                        )
                    )}
                </div>
            ))}
        </div>
    );
};
