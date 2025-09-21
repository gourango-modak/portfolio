import { useState, useRef, useEffect } from "react";
import { useRenderLogger } from "../../debugging/useRenderLogger";
import { ColorPicker } from "./../../ColorPicker";
import { useColorPickerStore } from "../../store/useColorPickerStore";

export const ColorProperty = ({ value: initialColor, id }) => {
    const previewRef = useRef(null);
    const [colorInput, setColorInput] = useState(initialColor);
    const openColorPicker = useColorPickerStore((s) => s.open);
    const setColor = useColorPickerStore((s) => s.setColor);
    const color = useColorPickerStore((s) => s.colorPickers[id]?.color);

    useEffect(() => {
        if (color) {
            setColorInput(color);
        }
    }, [color]);

    useRenderLogger("ColorProperty");

    const handleInputChange = (e) => {
        const newColor = e.target.value;
        setColorInput(newColor);

        if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(newColor)) {
            setColor(id, newColor);
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
            <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={colorInput}
                        onChange={handleInputChange}
                        className="w-20 p-1 border border-gray-300 rounded text-sm text-center"
                    />
                    <div
                        ref={previewRef}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        style={{ backgroundColor: colorInput }}
                        onClick={handleColorPicker}
                    ></div>
                </div>
            </div>
            <ColorPicker id={id} />
        </>
    );
};
