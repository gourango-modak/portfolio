import { useState, useEffect, useRef } from "react";
import { X, Filter } from "lucide-react";

export const MultiSelectDropdown = ({
    label,
    options,
    selectedOptions,
    setSelectedOptions,
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);

    // --- Close dropdown when clicking outside ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // --- Toggle option selection ---
    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((o) => o !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    // --- Filter options based on search ---
    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative flex-1/6" ref={dropdownRef}>
            <button
                type="button"
                className="w-full p-2 border border-gray-300 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setOpen(!open)}
            >
                <span>{label}</span>
                {open ? <X size={16} /> : <Filter size={16} />}
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {/* Search box */}
                    <div className="p-2 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Filtered options */}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, idx) => (
                            <label
                                key={idx}
                                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => toggleOption(option)}
                                />
                                {option}
                            </label>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-gray-500 text-sm">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
