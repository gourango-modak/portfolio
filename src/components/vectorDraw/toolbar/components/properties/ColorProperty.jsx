import { useRef, useEffect } from "react";
import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { ColorPicker } from "../../../components/ColorPicker";
import { colorPickerSlice } from "../../../store/utils";
import { useColorPickerColor } from "../../../store/selectors/colorPickerSelectors";

export const ColorProperty = ({ propertyName, property, onChange }) => {
    const { id, value: initialColor } = property;
    const previewRef = useRef(null);

    const color = useColorPickerColor(id);
    const inputColor = color || initialColor;

    const { setColor, open: openColorPicker } = colorPickerSlice.getSlice();

    useEffect(() => {
        if (color && color !== initialColor) {
            onChange(propertyName, { ...property, value: color });
        }
    }, [color]);

    useRenderLogger("ColorProperty");

    const handleInputChange = (e) => {
        const newColor = e.target.value;

        // Regex to support: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
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

    return (
        <>
            <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center gap-2 w-full">
                    <input
                        type="text"
                        value={inputColor}
                        onChange={handleInputChange}
                        className="flex-1 min-w-0 p-1 border border-gray-300 rounded text-sm text-center"
                    />
                    <div
                        ref={previewRef}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer flex-shrink-0"
                        style={{ backgroundColor: inputColor }}
                        onClick={handleColorPicker}
                    ></div>
                </div>
            </div>

            <ColorPicker id={id} />
        </>
    );
};
