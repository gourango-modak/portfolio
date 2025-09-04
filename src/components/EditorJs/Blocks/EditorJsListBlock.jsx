const EditorJsListBlock = ({ style, items }) => {
    const isOrdered = style === "ordered";
    const ListTag = isOrdered ? "ol" : "ul";

    // Prose-like left padding (adjusted for text size)
    const paddingClass = "pl-6 sm:pl-7";

    return (
        <ListTag
            className={`
        ${isOrdered ? "list-decimal" : "list-disc"}
        list-outside ${paddingClass} mb-5
        text-slate-700 marker:text-slate-800
        text-base sm:text-lg
      `}
        >
            {items.map((item, i) => (
                <li
                    key={i}
                    className="mb-2 pl-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                />
            ))}
        </ListTag>
    );
};

export default EditorJsListBlock;
