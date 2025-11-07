import { useState, useEffect, useRef, useCallback } from "react";

export default function InfiniteScroll({
    fetchData,
    renderItem,
    limit = Infinity,
    containerClass = "",
    itemClass = "",
    loadingComponent = null,
    endMessage = null,
    maxItems = Infinity,
}) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [visibleItems, setVisibleItems] = useState([]); // New state

    const observer = useRef();
    const lastItemRef = useCallback(
        (node) => {
            if (loading || !hasMore) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        const loadData = async () => {
            if (loading || !hasMore || items.length >= maxItems) return;

            setLoading(true);
            const newItems = await fetchData(page, limit);

            // This is a simple way to get unique items assuming an 'id' property.
            // You can replace this with a more robust solution if necessary.
            setItems((prevItems) => {
                const combined = [...prevItems, ...newItems];
                const uniqueIds = new Set(combined.map((item) => item.id));
                return Array.from(uniqueIds).map((id) =>
                    combined.find((item) => item.id === id)
                );
            });

            // Use a slight delay to apply the "visible" class for the fade-in effect
            setTimeout(() => {
                setVisibleItems((prevVisible) => [
                    ...prevVisible,
                    ...newItems.map((item) => item.id),
                ]);
            }, 50);

            setLoading(false);

            if (
                newItems.length < limit ||
                items.length + newItems.length >= maxItems
            ) {
                setHasMore(false);
            }
        };

        if (hasMore) {
            loadData();
        }
    }, [page, fetchData, limit, maxItems, hasMore]);

    return (
        <>
            <div className={containerClass}>
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1 && hasMore;
                    const isVisible = visibleItems.includes(item.id);

                    return (
                        <div
                            key={item.id}
                            ref={isLast ? lastItemRef : null}
                            className={`${itemClass} infinite-scroll-item ${
                                isVisible ? "visible" : ""
                            }`}
                        >
                            {renderItem(item)}
                        </div>
                    );
                })}
            </div>

            {loading && (
                <div className="flex justify-center items-center py-20">
                    {loadingComponent || (
                        <>
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="loader border-4 border-t-indigo-600 border-gray-200 rounded-full w-8 h-8 animate-spin"></div>
                                <span className="text-gray-700 font-medium mt-2 text-sm">
                                    Loading More....
                                </span>
                            </div>
                        </>
                    )}
                </div>
            )}

            {!hasMore && endMessage && (
                <div className="flex justify-center py-8">{endMessage}</div>
            )}
        </>
    );
}
