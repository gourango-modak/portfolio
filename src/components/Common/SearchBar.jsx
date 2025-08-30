import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <div className="relative max-w-lg mx-auto mb-6">
        <input
            type="text"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-400 bg-gray-50 text-gray-800 outline-none rounded-full shadow-sm
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:shadow-md transition-all duration-200"
        />
        <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            size={20}
        />
    </div>
);

export default SearchBar;
