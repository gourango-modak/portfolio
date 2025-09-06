import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const SearchInput = ({ searchTerm, onSearch, debounceTime = 300 }) => {
    const [value, setValue] = useState(searchTerm || "");

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(value); // Inform parent after debounce
        }, debounceTime);

        return () => clearTimeout(handler); // Clean up on value change
    }, [value, onSearch, debounceTime]);

    return (
        <div className="relative max-w-lg mx-auto mb-6">
            <input
                type="text"
                placeholder="Search articles by title..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-400 bg-gray-50 text-gray-800 outline-none rounded-full shadow-sm
           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:shadow-md transition-all duration-200"
            />
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                size={20}
            />
        </div>
    );
};

export default SearchInput;
