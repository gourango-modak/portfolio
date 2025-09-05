import { ExternalLink, Github } from "lucide-react";
import { Breadcrumb } from "../../components/Common/Breadcrumb";
import EditorJsContentRenderer from "./../../components/EditorJs/EditorJsContentRenderer";
import ProjectDetailHeader from "./ProjectDetailHeader";

export const ProjectDetail = ({ project }) => {
    const crumbs = [
        { to: "/", label: "Home" },
        { to: "/projects", label: "Projects" },
        { label: project.title },
    ];

    return (
        <>
            <Breadcrumb crumbs={crumbs} />

            <ProjectDetailHeader project={project} />

            <EditorJsContentRenderer content={project.content} />

            {/* Project Links Card Section */}
            {(project.liveUrl || project.repoUrl) && (
                <section>
                    <h2 className="text-xl md:text-2xl font-bold mb-6 mt-12">
                        View the Project
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {project.liveUrl && (
                            <div className="link-card flex flex-col justify-between rounded-xl border border-indigo-100 p-6 shadow hover:shadow-lg transition bg-indigo-50">
                                <div className="flex flex-col items-start gap-2">
                                    <span className="text-3xl">🚀</span>
                                    <h3 className="text-lg font-bold text-indigo-700">
                                        Live Demo
                                    </h3>
                                    <p className="text-sm text-indigo-800">
                                        Experience the app in action.
                                    </p>
                                </div>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    Visit Site →
                                </a>
                            </div>
                        )}

                        {project.repoUrl && (
                            <div className="link-card flex flex-col justify-between rounded-xl border border-slate-200 p-6 shadow hover:shadow-lg transition bg-white">
                                <div className="flex flex-col items-start gap-2">
                                    <span className="text-3xl">💻</span>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Source Code
                                    </h3>
                                    <p className="text-sm text-slate-700">
                                        Explore the full code on GitHub.
                                    </p>
                                </div>
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block font-semibold text-slate-800 hover:text-slate-900"
                                >
                                    View Repo →
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Project Technologies */}
            {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-12">
                    {project.technologies.map((tag) => (
                        <span
                            key={tag}
                            className="text-sm font-semibold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
};
