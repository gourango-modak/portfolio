import { useEffect, useRef } from "react";
import TableOfContentList from "./TableOfContentList";
import { useActiveHeading } from "./hooks/useActiveHeading";
import { scrollToSection } from "./tableOfContentsUtils";
import { flattenHeadings } from "../editorJs/editorJsUtils";
import { useTableOfContentScroll } from "./hooks/useTableOfContentScroll";

const TableOfContents = ({ headings }) => {
    const isClickScrollingRef = useRef(false);
    const tocRef = useRef(null);

    const { activeId, expandedIds, setActiveId, setExpandedIds } =
        useActiveHeading(headings, isClickScrollingRef);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.split("?")[1]);
        const sectionId = params.get("section");
        if (!sectionId) return;

        isClickScrollingRef.current = true;
        scrollToSection(sectionId);
        setActiveId(sectionId);

        const { parentMap } = flattenHeadings(headings);
        const newExpandedIds = [];
        let parentId = parentMap[sectionId];
        while (parentId) {
            newExpandedIds.push(parentId);
            parentId = parentMap[parentId];
        }
        setExpandedIds(newExpandedIds);

        setTimeout(() => (isClickScrollingRef.current = false), 700);
    }, [headings, setActiveId, setExpandedIds]);

    useTableOfContentScroll(tocRef, activeId);

    return (
        <nav className="sticky top-30 w-64 hidden lg:block pr-8">
            <div ref={tocRef} className="overflow-y-auto max-h-[100vh]">
                <h2 className="font-bold text-gray-800 uppercase tracking-wide mb-3">
                    Table of Content
                </h2>
                <TableOfContentList
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
