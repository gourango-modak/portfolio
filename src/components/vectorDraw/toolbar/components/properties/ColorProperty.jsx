import { useState, useRef, useEffect } from "react";
import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { ColorPicker } from "../../../components/ColorPicker";
import { colorPickerSlice } from "./../../../store/utils";
import { useColorPickerColor } from "../../../store/selectors/colorPickerSelectors";

export const ColorProperty = ({ id, propertyName, property, onChange }) => {
    const previewRef = useRef(null);
    const [inputColor, setInputColor] = useState(property.value);

    const color = useColorPickerColor(id);
    const { setColor, open: openColorPicker } = colorPickerSlice.getSlice();

    useEffect(() => {
        if (color && color !== inputColor) {
            onChange(propertyName, { ...property, value: color });
            setInputColor(color);
        }
    }, [color]);

    useEffect(() => {
        setInputColor(property.value);
    }, [property]);

    useRenderLogger("ColorProperty");

    const handleInputChange = (e) => {
        const newColor = e.target.value;
        setInputColor(newColor);

        // Validate hex formats: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
        if (
            /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(newColor)
        ) {
            setColor(id, newColor);
        }
    };

    const handleColorPicker = () => {
        const rect = previewRef.current.getBoundingClientRect();
        const gap = 2;
        openColorPicker(id, inputColor, {
            x: rect.left + window.scrollX,
            y: rect.bottom + window.scrollY + gap,
        });
    };

    const inputColorVal = inputColor !== "transparent" ? inputColor : "";

    return (
        <>
            <div className="flex items-center w-full gap-2 border border-gray-200 rounded-sm bg-gray-50 px-2 py-1.5">
                {/* Color preview (left) */}
                <div
                    ref={previewRef}
                    onClick={handleColorPicker}
                    className="w-5 h-5 rounded-sm cursor-pointer flex-shrink-0 border border-gray-300"
                    style={{ backgroundColor: inputColorVal }}
                ></div>

                {/* Color input (right) */}
                <input
                    type="text"
                    value={inputColorVal}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 px-2 text-center outline-none text-sm text-gray-800 bg-transparent"
                />
            </div>

            <ColorPicker id={id} />
        </>
    );
};
