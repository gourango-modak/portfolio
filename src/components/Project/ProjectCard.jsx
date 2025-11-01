import { Code, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/date";
import { errorLog, truncateText } from "../../utils/common";
import { CARD_DESCRIPTION_MAX_LENGTH } from "../../config";
import { fetchProjectByUrl } from "../../data/projects";
import { useLoader } from "../../context/LoaderContext";

const ProjectCard = ({ ref, project, onEdit }) => {
    const { isAuthenticated } = useAuth();
    const { withLoader } = useLoader();

    const handleEdit = async (project) => {
        try {
            const projectData = await withLoader(
                () => fetchProjectByUrl(project.url),
                "Fetching project data..."
            );
            onEdit?.(projectData);
        } catch (err) {
            errorLog("Failed to fetch project", err);
        }
    };

    return (
        <div
            ref={ref}
            className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-400 hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 relative"
        >
            <Link
                to={`/projects/${project.slug}`}
                className="flex flex-1 gap-6"
            >
                <div className="text-indigo-600 mt-1 flex-shrink-0">
                    <Code />
                </div>

                <div className="flex-1">
                    {/* Created / Updated Dates */}
                    <p className="text-sm text-slate-500 mb-1 w-[80%] sm:w-full">
                        {project.updatedAt &&
                        project.updatedAt !== project.createdAt
                            ? `Last Updated on ${formatDate(project.updatedAt)}`
                            : `Published on ${formatDate(project.createdAt)}`}
                    </p>

                    <h3 className="text-xl font-bold mb-2 text-slate-900">
                        {project.title}
                    </h3>

                    <p className="text-slate-600">
                        {truncateText(
                            project.description,
                            CARD_DESCRIPTION_MAX_LENGTH,
                            "..."
                        )}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags?.length > 0 &&
                            project.tags.map((tag) => (
                                <span
                                    key={tech}
                                    className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>
                </div>
            </Link>

            {isAuthenticated && onEdit && (
                <button
                    onClick={() => handleEdit(project)}
                    className="absolute top-4.5 right-4 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
                    title="Edit Project"
                >
                    <Edit3 size={16} className="text-gray-600" />
                </button>
            )}
        </div>
    );
};

export default ProjectCard;
