const TagFilter = ({
    topTags,
    selectedTag,
    setSelectedTag,
    allLabel = "All Label",
}) => (
    <div className="flex flex-wrap justify-center items-center gap-2">
        <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                !selectedTag
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100"
            }`}
        >
            {allLabel}
        </button>
        {topTags.map((tag) => (
            <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    selectedTag === tag
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100"
                }`}
            >
                {tag}
            </button>
        ))}
    </div>
);

export default TagFilter;
