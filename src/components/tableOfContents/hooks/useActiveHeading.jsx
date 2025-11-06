import { useEffect, useState } from "react";
import { flattenHeadings } from "../../editorJs/utils";

/**
 * Hook to track active heading based on scroll
 */
export const useActiveHeading = (headings, isClickScrollingRef) => {
    const [activeId, setActiveId] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);

    useEffect(() => {
        if (!headings?.length) return;

        const { result: flatHeadings, parentMap } = flattenHeadings(headings);

        const onScroll = () => {
            if (isClickScrollingRef.current) return;

            const scrollPos = window.scrollY + 160 + 10; // navbar + buffer
            let currentId = flatHeadings[0]?.id;

            flatHeadings.forEach((h) => {
                const el = document.getElementById(h.id);
                if (el && el.offsetTop <= scrollPos) currentId = h.id;
            });

            setActiveId(currentId);

            const parents = [];
            let parentId = parentMap[currentId];
            while (parentId) {
                parents.push(parentId);
                parentId = parentMap[parentId];
            }
            setExpandedIds(parents);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [headings, isClickScrollingRef]);

    return { activeId, expandedIds, setActiveId, setExpandedIds };
};
