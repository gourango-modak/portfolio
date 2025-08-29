import { useRef, useEffect } from "react";

export const InputField = ({
    label,
    name,
    value,
    onChange,
    required = false,
    error,
    minRows = 1, // initial height (rows)
}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // reset before measuring
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // adjust to content
        }
    }, [value, minRows]);

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700 mb-1"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hide-scrollbar"
            />

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
