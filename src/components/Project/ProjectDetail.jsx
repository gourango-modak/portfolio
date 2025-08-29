import { ExternalLink, Github, Calendar } from "lucide-react";
import { Breadcrumb } from "../Common/Breadcrumb";

export const ProjectDetail = ({ project }) => {
    const crumbs = [
        { to: "/", label: "Home" },
        { to: "/projects", label: "Projects" },
        { label: project.title },
    ];

    return (
        <>
            <Breadcrumb crumbs={crumbs} />
            {/* --- Project Header --- */}
            <header className="text-center mt-8 mb-12 pb-10 border-b border-slate-200">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {project.title}
                </h1>
                {project.tagline && (
                    <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                        {project.tagline}
                    </p>
                )}
                {project.startDate && project.endDate && (
                    <div className="flex items-center justify-center gap-2 text-slate-500 mb-8">
                        <Calendar size={16} />
                        <span>
                            {project.startDate} - {project.endDate}
                        </span>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
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
            <h1 className="text-4xl font-bold text-slate-900">
                {project.title}
            </h1>
            {project.startDate && project.endDate && (
                <div className="flex items-center gap-2 text-slate-500 my-4">
                    <Calendar size={16} />
                    <span>
                        {project.startDate} - {project.endDate}
                    </span>
                </div>
            )}
            <div className="mb-12 mt-10">
                <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-xl shadow-2xl w-full"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 text-slate-700 space-y-6">
                    {project.dynamicSections &&
                        project.dynamicSections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                                    {section.title}
                                </h2>
                                <p>{section.content}</p>
                            </div>
                        ))}
                    {/* Mobile/Tablet Tabs */}
                    <div className="sm:hidden">
                        <div className="my-6">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <span
                                        key={technology}
                                        className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full"
                                    >
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    {/* Desktop Sidebar */}
                    <div className="hidden md:block space-y-6">
                        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <span
                                        key={technology}
                                        className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full"
                                    >
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">
                                Key Features
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-slate-700">
                                {project.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <a
                            href={project.liveUrl}
                            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            View Live Site <ExternalLink size={20} />
                        </a>
                        <a
                            href={project.repoUrl}
                            className="bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            View Code <Github size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
