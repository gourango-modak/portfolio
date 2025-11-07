import { useRef, useEffect } from "react";

export const InputField = ({
    label,
    name,
    value,
    onChange,
    required = false,
    error,
    placeholder = "",
    minRows = 1,
    maxRows = 500,
}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height first to recalculate correctly
        textarea.style.height = "auto";

        // Then adjust height based on new content
        textarea.style.height = `${computeTextareaHeight(
            textarea,
            minRows,
            maxRows
        )}px`;
    }, [value, minRows, maxRows]);

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700 mb-2"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <textarea
                ref={textareaRef}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={minRows}
                placeholder={placeholder}
                style={{ overflow: "hidden" }}
                className={`w-full px-4 py-2 border rounded-lg outline-none resize-none focus:ring-2 hide-scrollbar ${
                    error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

const computeTextareaHeight = (textarea, minRows, maxRows) => {
    const style = getComputedStyle(textarea);

    const lineHeight = parseFloat(style.lineHeight);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const verticalPadding = paddingTop + paddingBottom;

    const minHeight = lineHeight * minRows + verticalPadding;
    const maxHeight = lineHeight * maxRows + verticalPadding;

    return Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
};
