import { ExternalLink, Github, Calendar } from "lucide-react";
import { Breadcrumb } from "../../components/Common/Breadcrumb";
import EditorJsContentRenderer from "./../../components/EditorJs/EditorJsContentRenderer";

export const ProjectDetail = ({ project }) => {
    const crumbs = [
        { to: "/", label: "Home" },
        { to: "/projects", label: "Projects" },
        { label: project.title },
    ];

    return (
        <>
            <Breadcrumb crumbs={crumbs} />
            <header className="mt-8 mb-12 pb-10 border-b border-slate-200">
                <h1 className="title font-bold text-slate-900 mb-2 leading-tight">
                    {project.title}
                </h1>
                {project.tagline && (
                    <p className="text-lg text-slate-600 mt-4 mb-2 max-w-2xl">
                        {project.tagline}
                    </p>
                )}
                {project.startDate && project.endDate && (
                    <div className="flex items-center justify-start gap-2 text-slate-500 mb-8">
                        <Calendar size={16} />
                        <span>
                            {project.startDate} - {project.endDate}
                        </span>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row justify-start gap-4">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                    >
                        <ExternalLink size={20} />
                        <span>Live Project</span>
                    </a>
                    <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-800 px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-800 hover:text-white"
                    >
                        <Github size={20} />
                        <span>Repository</span>
                    </a>
                </div>
            </header>
            <EditorJsContentRenderer content={project.content} />
            <div className="flex flex-wrap gap-2 mt-15">
                {project.technologies?.length > 0 &&
                    project.technologies.map((tag) => (
                        <span
                            key={tag}
                            className="text-sm font-semibold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
            </div>
        </>
    );
};
