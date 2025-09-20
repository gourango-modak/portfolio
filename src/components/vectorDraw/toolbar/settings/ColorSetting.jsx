import { HexColorPicker } from "react-colorful";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRenderLogger } from "../../debugging/useRenderLogger";

export const ColorSetting = ({ property, value, onChange }) => {
    const [color, setColor] = useState(value);
    const [showPicker, setShowPicker] = useState(false);
    const previewRef = useRef(null);
    const pickerRef = useRef(null);
    const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });

    useRenderLogger("ColorSetting");

    const handleInputChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(newColor)) {
            onChange(property, newColor);
        }
    };

    const handlePickerChange = (newColor) => {
        setColor(newColor);
        onChange(property, newColor);
    };

    const togglePicker = () => {
        if (previewRef.current) {
            const rect = previewRef.current.getBoundingClientRect();
            setPickerPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
        setShowPicker((prev) => !prev);
    };

    // Close only if click is outside both color box AND picker
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                previewRef.current &&
                pickerRef.current &&
                !previewRef.current.contains(e.target) &&
                !pickerRef.current.contains(e.target)
            ) {
                setShowPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col items-start gap-2">
            {/* Top row: input + preview */}
            <div className="flex items-center gap-2" ref={previewRef}>
                <input
                    type="text"
                    value={color}
                    onChange={handleInputChange}
                    className="w-20 p-1 border border-gray-300 rounded text-sm text-center"
                />
                <div
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={togglePicker}
                ></div>
            </div>

            {/* Picker portal */}
            {showPicker &&
                createPortal(
                    <div
                        ref={pickerRef}
                        style={{
                            position: "absolute",
                            top: pickerPos.top,
                            left: pickerPos.left,
                            zIndex: 9999,
                        }}
                    >
                        <HexColorPicker
                            color={color}
                            onChange={handlePickerChange}
                            className="w-40 h-20"
                        />
                    </div>,
                    document.body
                )}
        </div>
    );
};
