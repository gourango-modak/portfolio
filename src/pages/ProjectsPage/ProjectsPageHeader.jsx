const ProjectsPageHeader = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-slate-900">
                    My Projects
                </h1>
            </div>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                Here’s a glimpse into what I’ve been building — projects that
                pushed me to learn, experiment, and grow as a developer.
            </p>
        </>
    );
};

export default ProjectsPageHeader;
