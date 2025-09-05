import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({
    name,
    label,
    options,
    selected,
    onChange,
    placeholder = "Select...",
    required = false,
    error,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative mb-4" ref={dropdownRef}>
            {label && (
                <label
                    className="block mb-2 text-sm font-medium text-gray-700"
                    htmlFor={name}
                >
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <button
                type="button"
                id={name}
                className={`h-10 w-full flex justify-between items-center px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selected ? selected.label : placeholder}</span>
                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-500" : "text-gray-400"
                    }`}
                />
            </button>

            {isOpen && (
                <ul
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
                    role="listbox"
                    aria-labelledby={name}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                                selected?.value === option.value
                                    ? "bg-indigo-50 font-semibold"
                                    : ""
                            }`}
                            role="option"
                            onClick={() => {
                                onChange({ name: name, value: option });
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Dropdown;
