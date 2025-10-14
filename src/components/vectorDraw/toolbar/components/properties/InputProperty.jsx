import { useEffect, useState } from "react";
import { useRenderLogger } from "../../../hooks/useRenderLogger";

export const InputProperty = ({ propertyName, property, onChange }) => {
    const [number, setNumber] = useState(property.value);
    const { min = 0, max = 100 } = property;

    useRenderLogger("NumberProperty");

    useEffect(() => {
        setNumber(property.value);
    }, [property]);

    const handleChange = (e) => {
        setNumber(Number(e.target.value));
        onChange(propertyName, {
            ...property,
            value: Number(e.target.value),
        });
    };

    return (
        <input
            type="input"
            value={number}
            onChange={handleChange}
            min={min}
            max={max}
            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-md 
               text-sm text-gray-800 focus:outline-none"
        />
    );
};
