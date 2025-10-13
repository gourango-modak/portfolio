import { useState } from "react";
import { useRenderLogger } from "../../../hooks/useRenderLogger";

export const NumberProperty = ({ propertyName, property, onChange }) => {
    const [number, setNumber] = useState(property.value);
    const { min = 0, max = 100 } = property;

    useRenderLogger("NumberProperty");

    const handleChange = (e) => {
        setNumber(Number(e.target.value));
        onChange(propertyName, {
            ...property,
            value: Number(e.target.value),
        });
    };

    return (
        <input
            type="number"
            value={number}
            onChange={handleChange}
            min={min}
            max={max}
            className="w-full px-2 py-1 border border-gray-300 rounded"
        />
    );
};
