import { useEffect, useState, useRef } from "react";
import { useRenderLogger } from "../../../hooks/useRenderLogger";

export const InputProperty = ({ propertyName, property, onChange }) => {
    const [number, setNumber] = useState(property.value);
    const { min = 0, max = Infinity } = property;
    const debounceRef = useRef(null);

    useRenderLogger("NumberProperty");

    useEffect(() => {
        setNumber(property.value);
    }, [property]);

    const applyChange = (value) => {
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

    const handleChange = (e) => {
        const value = e.target.value;
        setNumber(value);

        // Clear previous debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Set new debounce
        debounceRef.current = setTimeout(() => {
            applyChange(Number(value));
        }, 300); // 300ms delay
    };

    return (
        <input
            type="number"
            value={number}
            onChange={handleChange}
            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-md 
               text-sm text-gray-800 focus:outline-none"
        />
    );
};
