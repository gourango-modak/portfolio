const ProjectsPageHeader = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-slate-900">Portfolio</h1>
            </div>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                Explore a curated selection of my projects. Each one represents
                a unique challenge and a step forward in my journey as a
                developer.
            </p>
        </>
    );
};

export default ProjectsPageHeader;
