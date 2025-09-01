const EditorJsHeaderBlock = ({ text, level, isFirstBlock }) => {
    const Tag = `h${level}`;

    // Base class for all headers
    const baseClass = "text-slate-800 leading-tight";

    // Bottom margins similar to Tailwind prose
    const levelClasses = {
        1: "text-2xl sm:text-3xl md:text-4xl font-bold mb-6",
        2: `text-2xl md:text-3xl font-bold mb-6 ${
            isFirstBlock ? "mt-8" : "mt-12"
        }`,
        3: "text-xl md:text-2xl font-semibold mb-4 mt-10",
        4: "text-base sm:text-lg md:text-xl mb-3",
    };

    return (
        <Tag className={`${baseClass} ${levelClasses[level] || "mb-4"}`}>
            {text}
        </Tag>
    );
};

export default EditorJsHeaderBlock;
