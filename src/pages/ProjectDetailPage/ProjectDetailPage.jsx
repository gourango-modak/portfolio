import { useParams } from "react-router-dom";
import { fetchProjectBySlug } from "../../data/projects";
import TableOfContents from "../../components/tableOfContents/TableOfContents";
import { extractHeadings } from "../../components/editorJs/editorJsUtils";
import ResourceLoader from "../../components/common/ResourceLoader";
import ProjectContent from "./ProjectContent";

const ProjectDetailPage = () => {
    const { slug } = useParams();

    return (
        <section className="pt-30 min-h-screen bg-gray-50/50 pb-24">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <ResourceLoader id={slug} fetchFn={fetchProjectBySlug}>
                    {(project) => (
                        <div className="lg:flex lg:gap-12">
                            {/* Left Column: TOC */}
                            <div className="w-64 hidden lg:block">
                                <TableOfContents
                                    headings={extractHeadings(project.content)}
                                />
                            </div>

                            {/* Right Column: Project Content */}
                            <ProjectContent project={project} />
                        </div>
                    )}
                </ResourceLoader>
            </div>
        </section>
    );
};

export default ProjectDetailPage;
