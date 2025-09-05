import { useEffect, useRef, useState } from "react";
import TOCList from "./TOCList";

const TableOfContents = ({ headings }) => {
    const [activeId, setActiveId] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);
    const isClickScrollingRef = useRef(false); // <-- use a ref
    const tocRef = useRef(null); // ref for TOC container

    // Scroll to section if URL contains ?section=
    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.split("?")[1]);
        const sectionId = params.get("section");

        if (sectionId) {
            const el = document.getElementById(sectionId);
            if (el) {
                const navbarHeight = 120; // replace with your navbar height in px
                const elementTop =
                    el.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementTop - navbarHeight,
                    behavior: "smooth",
                });
            }
            setActiveId(sectionId);
        }
    }, []);

    // Flatten headings recursively
    const flattenHeadings = (items, parentMap = {}) => {
        let result = [];
        items.forEach((item) => {
            result.push(item);
            if (item.children && item.children.length > 0) {
                item.children.forEach(
                    (child) => (parentMap[child.id] = item.id)
                );
                const childResult = flattenHeadings(item.children, parentMap);
                result = result.concat(childResult.result);
                Object.assign(parentMap, childResult.parentMap);
            }
        });
        return { result, parentMap };
    };

    // Update active TOC item on scroll
    useEffect(() => {
        const { result: flatHeadings, parentMap } = flattenHeadings(headings);

        const handleScroll = () => {
            if (isClickScrollingRef.current) return; // skip updating activeId while click-scroll is happening

            const navbarHeight = 160;
            const scrollPosition = window.scrollY + navbarHeight + 10;
            let currentId = flatHeadings[0]?.id;

            flatHeadings.forEach((heading) => {
                const el = document.getElementById(heading.id);
                if (el && el.offsetTop <= scrollPosition) {
                    currentId = heading.id;
                }
            });

            setActiveId(currentId);

            // Auto-expand parents
            const newExpandedIds = [];
            let parentId = parentMap[currentId];
            while (parentId) {
                newExpandedIds.push(parentId);
                parentId = parentMap[parentId];
            }

            setExpandedIds(newExpandedIds);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initialize activeId on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [headings]);

    // Scroll active TOC item into view
    useEffect(() => {
        if (!activeId || !tocRef.current) return;

        const tocEl = tocRef.current;
        const activeEl = document.getElementById(`toc-${activeId}`);
        if (!activeEl) return;

        // Get the first TOC item
        const firstItem = tocEl.querySelector("li"); // assuming <li> in TOCList
        const topOffset = 10; // optional spacing from top for normal items

        if (activeEl === firstItem) {
            // If it's the topmost item, scroll TOC all the way to top
            tocEl.scrollTop = 0;
        } else {
            // Scroll so that active element is at the top with optional offset
            tocEl.scrollTop = activeEl.offsetTop - topOffset;
        }
    }, [activeId]);

    return (
        <nav className="sticky top-30 w-64 hidden lg:block pr-8">
            <div ref={tocRef} className="overflow-y-auto max-h-[100vh]">
                <h2 className="font-bold text-gray-800 uppercase tracking-wide mb-3">
                    Table of Content
                </h2>
                <TOCList
                    items={headings}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    expandedIds={expandedIds}
                    setIsClickScrolling={(val) =>
                        (isClickScrollingRef.current = val)
                    }
                />
            </div>
        </nav>
    );
};

export default TableOfContents;
