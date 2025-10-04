import { useState } from "react";
import { useRenderLogger } from "../../debugging/useRenderLogger";

export const NumberProperty = ({
    property,
    value,
    onChange,
    min = 0,
    max = 100,
}) => {
    const [number, setNumber] = useState(value);

    useRenderLogger("NumberProperty");

    const handleChange = (e) => {
        setNumber(Number(e.target.value));
        onChange({ name: property, value: Number(e.target.value) });
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
