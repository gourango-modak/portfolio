const TagFilter = ({
    topTags,
    selectedTags = [],
    setSelectedTags,
    allLabel = "All Labels",
}) => {
    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const clearTags = () => setSelectedTags([]);

    return (
        <div className="flex flex-wrap justify-center items-center gap-2">
            <button
                onClick={clearTags}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    selectedTags.length === 0
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100"
                }`}
            >
                {allLabel}
            </button>
            {topTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                        selectedTags.includes(tag)
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100"
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
