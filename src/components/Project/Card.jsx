import { Code } from "lucide-react";
import { Link } from "react-router-dom";
import { truncateText } from "../../utils/common";
import { CARD_DESCRIPTION_MAX_LENGTH } from "../../config";

const ProjectCard = ({ project }) => {
    return (
        <Link
            to={`/projects/${project.slug}`}
            className="flex flex-col bg-white/60 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 hover:border-indigo-400 hover:shadow-indigo-500/10 transition-all duration-300"
        >
            <div className="p-6">
                <div className="text-indigo-600 mb-4">{<Code size={32} />}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">
                    {project.title}
                </h3>
                <p className="text-slate-600 mb-4 flex-grow">
                    {truncateText(
                        project.description,
                        CARD_DESCRIPTION_MAX_LENGTH,
                        "..."
                    )}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies?.length > 0 &&
                        project.technologies.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
