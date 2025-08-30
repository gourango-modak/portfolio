import { Link } from "react-router-dom";
import { truncateBreadcrumb } from "../../utils/common";

export const Breadcrumb = ({ crumbs }) => {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-3 text-[14.5px] text-slate-500">
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
                                {crumb.label}
                            </Link>
                        ) : (
                            <span>{truncateBreadcrumb(crumb.label)}</span>
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
