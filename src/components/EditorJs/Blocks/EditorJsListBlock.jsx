const EditorJsListBlock = ({ style, items }) => {
    const isOrdered = style === "ordered";
    const ListTag = isOrdered ? "ol" : "ul";

    const paddingClass = "pl-6 sm:pl-7"; // consistent padding for nested lists

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
                <li key={i} className="mb-2 pl-2 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />

                    {/* ✅ Render nested list recursively if it exists */}
                    {item.items && item.items.length > 0 && (
                        <EditorJsListBlock style={style} items={item.items} />
                    )}
                </li>
            ))}
        </ListTag>
    );
};

export default EditorJsListBlock;
