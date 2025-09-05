import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import TOCList from "./TOCList";

const TOCItem = ({
    item,
    activeId,
    setActiveId,
    expandedIds,
    setIsClickScrolling,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isActive = activeId === item.id;
    const hasChildren = item.children && item.children.length > 0;

    useEffect(() => {
        if (Array.isArray(expandedIds) && expandedIds.includes(item.id)) {
            setIsOpen(true);
        }
    }, [expandedIds, item.id]);

    const handleClick = (e) => {
        e.preventDefault();
        setIsClickScrolling(true);

        // Scroll to section
        const el = document.getElementById(item.id);
        if (el) {
            const navbarHeight = 120; // Adjust to your navbar height
            const elementTop = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementTop - navbarHeight,
                behavior: "smooth",
            });
        }

        // Update URL
        const baseHash = window.location.hash.split("?")[0];
        const newHash = `${baseHash}?section=${item.id}`;
        window.history.replaceState(null, "", newHash);

        // Mark as active
        setActiveId(item.id);

        // Toggle children if present
        if (hasChildren) setIsOpen((prev) => !prev);

        // Re-enable scroll updates after animation
        setTimeout(() => setIsClickScrolling(false), 1000); // adjust duration to match smooth scroll
    };

    // Determine left margin based on level
    const marginClass = item.level === 2 ? "ml-0" : "ml-4";

    return (
        <li id={`toc-${item.id}`}>
            <div className="flex items-center justify-between">
                <a
                    href="#"
                    onClick={handleClick}
                    className={`transition-colors duration-200 ${marginClass} ${
                        isActive
                            ? "text-blue-600 font-semibold"
                            : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                    {item.text}
                </a>

                {hasChildren && (
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={`${marginClass} text-gray-400 hover:text-gray-600 p-1 rounded`}
                        aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                        <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                                isOpen
                                    ? "rotate-180 text-blue-500"
                                    : "text-gray-400"
                            }`}
                        />
                    </button>
                )}
            </div>

            {hasChildren && isOpen && (
                <div className="ml-4 mt-1">
                    <TOCList
                        items={item.children}
                        activeId={activeId}
                        setActiveId={setActiveId}
                        expandedIds={expandedIds}
                        setIsClickScrolling={setIsClickScrolling}
                    />
                </div>
            )}
        </li>
    );
};

export default TOCItem;
