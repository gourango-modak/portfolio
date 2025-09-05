import { useState, useEffect, useRef, useCallback } from "react";
import Loader from "./Loader";

export default function InfiniteScroll({
    fetchData,
    renderItem,
    pageSize = 10,
    threshold = 300,
    containerClasses = "", // for content container styling
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

    useEffect(() => {
        loadPage(1);
    }, [loadPage]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            debugger;
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
            ref={containerRef}
            className="overflow-y-auto"
            // style={{ height: "80vh" }}
        >
            <div className={containerClasses}>
                {items.map((item, idx) => renderItem(item, idx))}
            </div>

            {loading && (
                <div className="flex justify-center my-4">
                    <Loader />
                </div>
            )}
        </div>
    );
}
