import { useEffect, useState, useRef } from "react";
import { useRenderLogger } from "../../../hooks/useRenderLogger";

export const InputProperty = ({ propertyName, property, onChange }) => {
    const [inputValue, setInputValue] = useState(property.value.toString());
    const { min = 0, max = Infinity } = property;
    const debounceRef = useRef(null);

    useRenderLogger("NumberProperty");

    useEffect(() => {
        setInputValue(property.value.toString());
    }, [property]);

    const applyChange = (value) => {
        // Clamp and round
        let newValue = Math.min(Math.max(value, min), max);
        newValue = Math.round(newValue * 10000) / 10000;

        setInputValue(newValue.toString());
        onChange(propertyName, { ...property, value: newValue });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) applyChange(numValue);
        }, 300);
    };

    return (
        <input
            type="number"
            value={inputValue}
            onChange={handleChange}
            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-md 
               text-sm text-gray-800 focus:outline-none"
        />
    );
};
