import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useDragHandler } from "./useDragHandler";
import { ToolSettingsMenuHeader } from "./ToolSettingsMenuHeader";

export const FloatingColorPicker = ({
    initialColor = "#ff0000",
    onChange,
    isOpen,
    onClose,
    title = "Color Picker",
    initialPosition = { x: 100, y: 300 },
}) => {
    const pickerRef = useRef(null);
    const [color, setColor] = useState(initialColor);
    const [position, setPosition] = useState(initialPosition);

    const { dragging, handleMouseDown } = useDragHandler(position, setPosition);

    // Update color if parent changes initialColor
    useEffect(() => {
        setColor(initialColor);
    }, [initialColor]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^#([0-9A-Fa-f]{0,6})$/.test(value)) {
            setColor(value);
            onChange?.(value);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={pickerRef}
            style={{
                position: "fixed",
                background: "#fff",
                top: position.y,
                left: position.x,
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                zIndex: 2000,
                width: "240px",
                userSelect: dragging ? "none" : "auto",
            }}
        >
            <ToolSettingsMenuHeader
                title={title}
                onClose={onClose}
                onMouseDown={handleMouseDown}
            />

            {/* Color Picker */}
            <div className="px-5 pt-5">
                <HexColorPicker
                    color={color}
                    onChange={(newColor) => {
                        setColor(newColor);
                        onChange?.(newColor);
                    }}
                />
            </div>

            {/* Input Box */}
            <div className="p-5">
                <input
                    type="text"
                    value={color}
                    onChange={handleInputChange}
                    style={{
                        width: "100%",
                        padding: "6px 8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "13px",
                    }}
                />
            </div>
        </div>
    );
};
