import { Link } from "react-router-dom";
import { CONFIG } from "../../config/config";

export const Breadcrumb = ({ crumbs }) => {
    const truncate = (text, maxLength = CONFIG.BREADCRUMB_MAX_LENGTH) =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                {crumbs.map((crumb, index) => (
                    <li
                        key={index}
                        className="flex flex-wrap items-center gap-2"
                    >
                        {crumb.to ? (
                            <Link
                                to={crumb.to}
                                className="text-indigo-600 hover:underline"
                            >
                                {truncate(crumb.label)}
                            </Link>
                        ) : (
                            <span>{truncate(crumb.label)}</span>
                        )}

                        {/* Add separator after text, except for the last crumb */}
                        {index < crumbs.length - 1 && (
                            <span className="flex-shrink-0 select-none">
                                &gt;
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
