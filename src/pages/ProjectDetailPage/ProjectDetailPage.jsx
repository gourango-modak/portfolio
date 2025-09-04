import { useParams } from "react-router-dom";
import DataLoader from "../../components/Common/DataLoader";
import { ProjectDetail } from "./ProjectDetail";
import { fetchProjects } from "../../data/projects";

const ProjectDetailPage = () => {
    const { slug } = useParams();

    return (
        <section className="pt-30 min-h-screen bg-gray-50/50 pb-24">
            <div className="container mx-auto px-6 md:px-12 md:max-w-4xl">
                <DataLoader
                    fetchData={fetchProjects}
                    render={(projects) => (
                        <ProjectDetail
                            project={projects.find((p) => p.slug === slug)}
                        />
                    )}
                />
            </div>
        </section>
    );
};

export default ProjectDetailPage;
