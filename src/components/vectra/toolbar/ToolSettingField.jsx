import { formatToReadable } from "./../../../utils/common";

export const ToolSettingField = ({
    keyName,
    value,
    onChange,
    openColorPicker,
}) => {
    const label = formatToReadable(keyName);

    // Color picker
    if (keyName === "color" || keyName === "strokeColor") {
        return (
            <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div
                    onClick={() => openColorPicker("color")}
                    className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: value }}
                />
            </div>
        );
    }

    // Numeric sliders
    if (["strokeSize", "strokeWidth", "size"].includes(keyName)) {
        return (
            <div style={{ marginBottom: "12px" }}>
                <label
                    style={{
                        display: "block",
                        marginBottom: "4px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#444",
                    }}
                >
                    {label}
                </label>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={value}
                    onChange={(e) =>
                        onChange(keyName, parseInt(e.target.value, 10))
                    }
                    style={{ width: "100%" }}
                />
            </div>
        );
    }

    // Extendable for checkboxes, dropdowns, text inputs, etc.
    return null;
};
