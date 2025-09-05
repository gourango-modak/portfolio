import { useEffect } from "react";

/**
 * Hook to scroll TOC container to show active item
 */
export const useTableOfContentScroll = (tocRef, activeId) => {
    useEffect(() => {
        if (!activeId || !tocRef.current) return;

        const tocEl = tocRef.current;
        const activeEl = document.getElementById(`toc-${activeId}`);
        if (!activeEl) return;

        const firstItem = tocEl.querySelector("li");
        tocEl.scrollTop = activeEl === firstItem ? 0 : activeEl.offsetTop - 10;
    }, [activeId, tocRef]);
};
