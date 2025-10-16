import { useEffect, useState } from "react";
import { useRenderLogger } from "../../../hooks/useRenderLogger";

export const InputProperty = ({ propertyName, property, onChange }) => {
    const [number, setNumber] = useState(property.value);
    const { min = 0, max = Infinity } = property;

    useRenderLogger("NumberProperty");

    useEffect(() => {
        setNumber(property.value);
    }, [property]);

    const handleChange = (e) => {
        let value = Number(e.target.value);

        // Clamp value between min and max
        value = Math.min(Math.max(value, min), max);

        // Round to 4 decimal places
        value = Math.round(value * 10000) / 10000;

        setNumber(value);
        onChange(propertyName, {
            ...property,
            value,
        });
    };

    return (
        <input
            type="input"
            value={Math.floor(number)}
            onChange={handleChange}
            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-md 
               text-sm text-gray-800 focus:outline-none"
        />
    );
};
