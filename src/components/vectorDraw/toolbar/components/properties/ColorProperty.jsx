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
            <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center gap-2 w-full">
                    <input
                        type="text"
                        value={inputColorVal}
                        onChange={handleInputChange}
                        className="flex-1 min-w-0 p-1 border border-gray-300 rounded text-sm text-center"
                    />
                    <div
                        ref={previewRef}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer flex-shrink-0"
                        style={{ backgroundColor: inputColorVal }}
                        onClick={handleColorPicker}
                    ></div>
                </div>
            </div>

            <ColorPicker id={id} />
        </>
    );
};
