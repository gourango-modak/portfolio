import { useEffect, useRef, useState } from "react";
import { formatToReadable } from "../../../utils/common";

export const ToolSettingsMenu = ({ tool, onClose, onChange }) => {
    const menuRef = useRef(null);
    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [pos, setPos] = useState({ top: 100, left: 100 }); // default position

    // --- Handle dragging ---
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;
            e.preventDefault();

            let newLeft = e.clientX - dragOffsetRef.current.x;
            let newTop = e.clientY - dragOffsetRef.current.y;

            // Clamp to viewport
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const rect = menuRef.current?.getBoundingClientRect();
            if (rect) {
                newLeft = Math.max(0, Math.min(vw - rect.width, newLeft));
                newTop = Math.max(0, Math.min(vh - rect.height, newTop));
            }

            setPos({ top: newTop, left: newLeft });
        };

        const handleMouseUp = () => setDragging(false);

        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

    if (!tool) return null;

    const startDrag = (e) => {
        if (e.button !== 0) return; // only left click
        const rect = menuRef.current.getBoundingClientRect();
        dragOffsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        setDragging(true);
    };

    return (
        <div
            ref={menuRef}
            style={{
                position: "fixed",
                top: pos.top,
                left: pos.left,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                width: "300px",
                maxWidth: "90vw",
                maxHeight: "80vh",
                overflowY: "auto",
                zIndex: 2000,
                userSelect: dragging ? "none" : "auto",
            }}
        >
            {/* Header (drag handle + close button) */}
            <div
                onMouseDown={startDrag}
                style={{
                    cursor: "move",
                    background: "#f7f7f7",
                    padding: "8px 12px",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                }}
            >
                <span
                    style={{ fontSize: "14px", fontWeight: 600, color: "#333" }}
                >
                    {tool.label || tool.name} Settings
                </span>
                <button
                    onClick={onClose}
                    style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "#777",
                    }}
                >
                    ×
                </button>
            </div>

            {/* Settings content */}
            <div style={{ padding: "12px" }}>
                {tool.settings &&
                    Object.entries(tool.settings).map(([key, value]) => {
                        debugger;
                        return (
                            <div key={key} style={{ marginBottom: "12px" }}>
                                {key === "color" && (
                                    <>
                                        <label
                                            style={{
                                                display: "block",
                                                marginBottom: "4px",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                                color: "#444",
                                            }}
                                        >
                                            {formatToReadable(key)}
                                        </label>
                                        <input
                                            type="color"
                                            value={value}
                                            onChange={(e) =>
                                                onChange(key, e.target.value)
                                            }
                                            style={{ width: "100%" }}
                                        />
                                    </>
                                )}

                                {key === "size" && (
                                    <>
                                        <label
                                            style={{
                                                display: "block",
                                                marginBottom: "4px",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                                color: "#444",
                                            }}
                                        >
                                            {key}
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="50"
                                            value={value}
                                            onChange={(e) =>
                                                onChange(key, e.target.value)
                                            }
                                            style={{ width: "100%" }}
                                        />
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
