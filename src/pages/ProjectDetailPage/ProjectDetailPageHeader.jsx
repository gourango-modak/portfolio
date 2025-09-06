import { formatDate } from "./../../utils/date";

const ProjectDetailPageHeader = ({ project }) => {
    return (
        <header>
            {/* Project Title */}
            <h1 className="title text-slate-900 leading-tight mb-4">
                {project.title}
            </h1>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-y-3 gap-x-6 text-gray-600 pb-6 border-b border-gray-200">
                {/* Created / Published Date */}
                {project.createdAt && (
                    <span className="flex items-center gap-2">
                        <span className="text-gray-400">📅</span>
                        Published:{" "}
                        <span className="text-slate-700 font-medium">
                            {formatDate(project.createdAt)}
                        </span>
                    </span>
                )}

                {/* Status (if not Completed) */}
                {project.status && project.status !== "Completed" && (
                    <span className="flex items-center gap-2">
                        <span className="text-gray-400">⏳</span>
                        Status:{" "}
                        <span className="text-slate-700 font-medium">
                            {project.status}
                        </span>
                    </span>
                )}

                {/* Status (if not Completed) */}
                {project.category && (
                    <span className="flex items-center gap-2">
                        <span className="text-gray-400">🏷️</span>
                        Category:{" "}
                        <span className="text-slate-700 font-medium">
                            {project.category}
                        </span>
                    </span>
                )}
            </div>
        </header>
    );
};

export default ProjectDetailPageHeader;
