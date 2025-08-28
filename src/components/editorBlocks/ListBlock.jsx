export default function ListBlock({ style, items }) {
    const isOrdered = style === "ordered";
    const ListTag = isOrdered ? "ol" : "ul";

    return (
        <ListTag
            className={`
                my-3 pl-6 space-y-2 text-xl text-slate-700
                ${isOrdered ? "list-decimal" : "list-disc"}
                marker:text-slate-500
            `}
        >
            {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                    {item.content}
                </li>
            ))}
        </ListTag>
    );
}
