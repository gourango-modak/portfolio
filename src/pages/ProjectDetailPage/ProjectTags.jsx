export const ProjectTags = ({ tags }) => {
    if (!tags?.length) return null;

    return (
        <div className="flex flex-wrap gap-3 mt-12">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="text-sm font-semibold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};
