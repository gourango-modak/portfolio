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
        if (!textareaRef.current) return;
        const textarea = textareaRef.current;

        const style = getComputedStyle(textarea);
        const lineHeight = parseFloat(style.lineHeight);
        const paddingTop = parseFloat(style.paddingTop);
        const paddingBottom = parseFloat(style.paddingBottom);

        const verticalPadding = paddingTop + paddingBottom;

        const minHeight = lineHeight * minRows + verticalPadding;
        const maxHeight = lineHeight * maxRows + verticalPadding;

        textarea.style.height = `${minHeight}px`;

        const newHeight = Math.min(
            Math.max(textarea.scrollHeight, minHeight),
            maxHeight
        );
        textarea.style.height = `${newHeight}px`;
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
                className={`w-full px-4 py-2 border rounded-lg outline-none resize-none focus:ring-2 hide-scrollbar ${
                    error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                style={{ overflow: "hidden" }}
                placeholder={placeholder}
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
