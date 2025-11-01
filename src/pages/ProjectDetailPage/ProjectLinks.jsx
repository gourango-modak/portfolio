import { Github, Rocket } from "lucide-react";
import { ToolCard } from "../../components/common/ToolCard";

const ProjectLinks = ({ liveUrl, repoUrl }) => {
    if (!liveUrl && !repoUrl) return null;

    return (
        <section>
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
                {liveUrl && (
                    <ToolCard
                        key={liveUrl}
                        tool={{
                            name: "Live Demo",
                            description: "Experience the app in action.",
                            icon: Rocket,
                            link: liveUrl,
                        }}
                    />
                )}
                {repoUrl && (
                    <ToolCard
                        key={repoUrl}
                        tool={{
                            name: "Source Code",
                            description: "Explore the full code on GitHub.",
                            icon: Github,
                            link: repoUrl,
                        }}
                    />
                )}
            </div>
        </section>
    );
};

export default ProjectLinks;
