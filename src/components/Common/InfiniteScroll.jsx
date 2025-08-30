import { useEffect, useRef, useCallback, useState } from "react";

const InfiniteScroll = ({ items = [], itemsPerPage = 6, renderItem }) => {
	const [visibleItems, setVisibleItems] = useState([]);
	const [page, setPage] = useState(1);
	const loaderRef = useRef(null);

	// Observer logic to watch scroll point
	const handleObserver = useCallback((entries) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPage((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		});

		if (loaderRef.current) observer.observe(loaderRef.current);

		return () => observer.disconnect();
	}, [handleObserver]);

	// Slice data when page changes
	useEffect(() => {
		const next = items.slice(0, page * itemsPerPage);
		setVisibleItems(next);
	}, [page, items]);

	return (
		<>
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{visibleItems.map((item, idx) => renderItem(item, idx))}
			</div> */}
			{visibleItems.map((item, idx) => renderItem(item, idx))}
			<div ref={loaderRef} className="w-full text-center py-6">
				{visibleItems.length < items.length ? (
					<span className="text-neutral-500 text-sm">
						Loading more...
					</span>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default InfiniteScroll;
