import ProjectLinkCard from "../../components/project/ProjectLinkCard";

const ProjectLinks = ({ liveUrl, repoUrl }) => {
    if (!liveUrl && !repoUrl) return null;

    return (
        <section>
            <h2
                id="view-the-project"
                className="text-xl md:text-2xl font-bold mb-6 mt-12"
            >
                View the Project
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
                {liveUrl && (
                    <ProjectLinkCard
                        icon="🚀"
                        title="Live Demo"
                        description="Experience the app in action."
                        url={liveUrl}
                        linkText="Visit Site"
                        styles="border-indigo-100 bg-indigo-50 text-indigo-700"
                    />
                )}
                {repoUrl && (
                    <ProjectLinkCard
                        icon="💻"
                        title="Source Code"
                        description="Explore the full code on GitHub."
                        url={repoUrl}
                        linkText="View Repo"
                        styles="border-slate-200 bg-white text-slate-900"
                    />
                )}
            </div>
        </section>
    );
};

export default ProjectLinks;
