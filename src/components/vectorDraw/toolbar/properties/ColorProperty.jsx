import { useState, useRef, useEffect } from "react";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { useColorPickerStore } from "../../store/useColorPickerStore";
import { ColorPicker } from "../../components/ColorPicker";

export const ColorProperty = ({ propertyName, property, onChange }) => {
    const { id, value: initialColor } = property;
    const previewRef = useRef(null);
    const [colorInput, setColorInput] = useState(initialColor);
    const openColorPicker = useColorPickerStore((s) => s.open);
    const setColor = useColorPickerStore((s) => s.setColor);
    const color = useColorPickerStore((s) => s.colorPickers[id]?.color);

    useEffect(() => {
        if (color) {
            setColorInput(color);
            onChange(propertyName, { ...property, value: color });
        }
    }, [color]);

    useEffect(() => {
        if (initialColor) {
            setColorInput(initialColor);
        }
    }, [initialColor]);

    useRenderLogger("ColorProperty");

    const handleInputChange = (e) => {
        const newColor = e.target.value;
        setColorInput(newColor);

        // Regex to support: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
        if (
            /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(newColor)
        ) {
            setColor(id, newColor);
            onChange(propertyName, { ...property, value: newColor });
        }
    };

    const handleColorPicker = () => {
        const rect = previewRef.current.getBoundingClientRect();
        const gap = 2;
        openColorPicker(id, colorInput, {
            left: rect.left + window.scrollX,
            top: rect.bottom + window.scrollY + gap,
        });
    };

    return (
        <>
            <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center gap-2 w-full">
                    <input
                        type="text"
                        value={colorInput}
                        onChange={handleInputChange}
                        className="flex-1 min-w-0 p-1 border border-gray-300 rounded text-sm text-center"
                    />
                    <div
                        ref={previewRef}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer flex-shrink-0"
                        style={{ backgroundColor: colorInput }}
                        onClick={handleColorPicker}
                    ></div>
                </div>
            </div>

            <ColorPicker id={id} />
        </>
    );
};
