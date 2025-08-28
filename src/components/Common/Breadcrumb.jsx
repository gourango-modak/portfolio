import { Link } from "react-router-dom";
import { CONFIG } from "../../config/config";

export const Breadcrumb = ({ crumbs }) => {
    const truncate = (text, maxLength = CONFIG.BREADCRUMB_MAX_LENGTH) =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
                {crumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {index > 0 && <span className="select-none">/</span>}
                        {crumb.to ? (
                            <Link
                                to={crumb.to}
                                className="hover:text-indigo-600 hover:underline"
                            >
                                {truncate(crumb.label)}
                            </Link>
                        ) : (
                            <span className="font-semibold text-slate-700">
                                {truncate(crumb.label)}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
