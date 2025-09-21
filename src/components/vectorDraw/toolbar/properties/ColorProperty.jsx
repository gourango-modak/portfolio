import { useState, useRef, useEffect } from "react";
import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useToolbarStore } from "../../store/useToolbarStore";
import { ColorPicker } from "./../../ColorPicker";

export const ColorProperty = ({ value: initialColor, triggerId }) => {
    const previewRef = useRef(null);
    const [colorInput, setColorInput] = useState(initialColor);
    const openColorPicker = useToolbarStore((s) => s.openColorPicker);
    const setColorPickerColor = useToolbarStore((s) => s.setColorPickerColor);
    const colorPicker = useToolbarStore((s) => s.colorPickers[triggerId]);

    useEffect(() => {
        if (colorPicker) {
            setColorInput(colorPicker.color);
        }
    }, [colorPicker]);

    useRenderLogger("ColorProperty");

    const handleInputChange = (e) => {
        const newColor = e.target.value;
        setColorInput(newColor);

        if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(newColor)) {
            setColorPickerColor(triggerId, newColor);
        }
    };

    const handleColorPicker = () => {
        const rect = previewRef.current.getBoundingClientRect();
        console.log(rect);
        const gap = 2;
        openColorPicker(triggerId, colorInput, {
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
            <ColorPicker triggerId={triggerId} />
        </>
    );
};
