import TOCItem from "./TOCItem";

const TOCList = ({
    items,
    activeId,
    setActiveId,
    expandedIds,
    setIsClickScrolling,
}) => (
    <ul className="space-y-2">
        {items.map((item) => (
            <TOCItem
                key={item.id}
                item={item}
                activeId={activeId}
                setActiveId={setActiveId}
                expandedIds={expandedIds}
                setIsClickScrolling={setIsClickScrolling}
            />
        ))}
    </ul>
);

export default TOCList;
