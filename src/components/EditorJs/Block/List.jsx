const EditorJsListBlock = ({ style, items }) => {
    const isOrdered = style === "ordered";
    const ListTag = isOrdered ? "ol" : "ul";

    return (
        <ListTag className="text-slate-700 marker:text-slate-600">
            {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                    {item.content}
                </li>
            ))}
        </ListTag>
    );
};

export default EditorJsListBlock;
