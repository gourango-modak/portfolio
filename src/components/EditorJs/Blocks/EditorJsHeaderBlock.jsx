const EditorJsHeaderBlock = ({ id, text, level, isFirstBlock }) => {
    const Tag = `h${level}`;

    const baseClass = "text-slate-800 leading-tight";

    const levelClasses = {
        2: `text-xl md:text-2xl font-bold mb-6 ${
            isFirstBlock ? "mt-8" : "mt-12"
        }`,
        3: "text-base md:text-xl font-semibold mb-4 mt-10",
    };

    return (
        <Tag
            id={id}
            className={`${baseClass} ${levelClasses[level] || "mb-4"}`}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
};

export default EditorJsHeaderBlock;
