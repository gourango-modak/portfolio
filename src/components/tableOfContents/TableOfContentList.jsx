import TableOfContentItem from "./TableOfContentItem";

const TableOfContentList = ({
    items,
    activeId,
    setActiveId,
    expandedIds,
    setIsClickScrolling,
}) => (
    <ul className="space-y-2">
        {items.map((item) => (
            <TableOfContentItem
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

export default TableOfContentList;
