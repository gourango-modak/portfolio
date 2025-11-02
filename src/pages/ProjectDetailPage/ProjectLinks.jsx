import { Github, Rocket } from "lucide-react";
import { AppCard } from "../../components/common/AppCard";

const ProjectLinks = ({ liveUrl, repoUrl }) => {
    if (!liveUrl && !repoUrl) return null;

    return (
        <section>
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
                {liveUrl && (
                    <AppCard
                        key={liveUrl}
                        app={{
                            name: "Live Demo",
                            description: "Experience the app in action.",
                            icon: Rocket,
                            link: liveUrl,
                        }}
                    />
                )}
                {repoUrl && (
                    <AppCard
                        key={repoUrl}
                        app={{
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
