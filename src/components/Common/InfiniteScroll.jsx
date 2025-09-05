import { useState, useEffect, useRef, useCallback } from "react";

export default function InfiniteScroll({
    fetchData, // async function(page, pageSize) => { data, hasMore }
    renderItem, // function to render each item
    pageSize = 10,
    threshold = 300,
}) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);

    const loadPage = useCallback(
        async (nextPage) => {
            if (!hasMore || loading) return;
            setLoading(true);
            try {
                const result = await fetchData(nextPage, pageSize);
                setItems((prev) => [...prev, ...result.data]);
                setHasMore(result.hasMore);
                setPage(nextPage);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        },
        [fetchData, hasMore, loading, pageSize]
    );

    // Initial load
    useEffect(() => {
        loadPage(1);
    }, [loadPage]);

    // Scroll listener
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollHeight - scrollTop - clientHeight < threshold) {
                loadPage(page + 1);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [loadPage, page, threshold]);

    return (
        <div
            ref={containerRef} /*style={{ height: "80vh", overflowY: "auto" }}*/
        >
            {items.map((item, idx) => renderItem(item, idx))}
            {loading && (
                <div style={{ textAlign: "center", padding: "1rem" }}>
                    Loading...
                </div>
            )}
            {!hasMore && (
                <div style={{ textAlign: "center", padding: "1rem" }}>
                    No more projects
                </div>
            )}
        </div>
    );
}
