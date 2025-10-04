import { useState, useEffect } from "react";
import { useRenderLogger } from "../../hooks/useRenderLogger";

export const SliderProperty = ({ propertyName, property, onChange }) => {
    const [value, setValue] = useState(property.value);
    const { min = 0, max = 100, step = 1 } = property;

    useRenderLogger("SliderProperty");

    // Keep local state in sync if property.value changes externally
    useEffect(() => {
        setValue(property.value);
    }, [property.value]);

    const handleChange = (newValue) => {
        setValue(newValue);
        onChange(propertyName, { ...property, value: newValue });
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="flex-1"
            />
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-gray-300 rounded"
            />
        </div>
    );
};
