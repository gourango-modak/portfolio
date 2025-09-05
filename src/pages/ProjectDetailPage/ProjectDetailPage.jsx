import { useParams } from "react-router-dom";
import DataLoader from "../../components/Common/DataLoader";
import { ProjectDetail } from "./ProjectDetail";
import { fetchProjects } from "../../data/projects";
import TableOfContents from "../../components/TOC/TableOfContents";
import { extractHeadings } from "../../utils/editor";

const ProjectDetailPage = () => {
    const { slug } = useParams();

    return (
        <section className="pt-30 min-h-screen bg-gray-50/50 pb-24">
            <DataLoader
                fetchData={fetchProjects}
                render={(projects) => (
                    <div className="container mx-auto px-6 md:px-12 md:max-w-6xl lg:flex lg:gap-12">
                        {/* Left Column: TOC (fixed inside this space) */}
                        <div className="w-64 hidden lg:block">
                            <TableOfContents
                                headings={extractHeadings(
                                    projects.find((p) => p.slug === slug)
                                        .content
                                )}
                            />
                        </div>

                        {/* Right Column: Blog Content */}
                        <div className="lg:flex-1 lg:min-w-0">
                            <ProjectDetail
                                project={projects.find((p) => p.slug === slug)}
                            />
                        </div>
                    </div>
                )}
            />
        </section>
    );
};

export default ProjectDetailPage;
