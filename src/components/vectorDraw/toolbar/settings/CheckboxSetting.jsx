import { useRenderLogger } from "../../debugging/useRenderLogger";

export const CheckboxSetting = ({ property, value, onChange }) => {
    const handleChange = (e) => {
        onChange(property, e.target.checked);
    };

    useRenderLogger("CheckboxSetting");

    return (
        <input
            type="checkbox"
            checked={value}
            onChange={handleChange}
            className="w-5 h-5"
        />
    );
};
