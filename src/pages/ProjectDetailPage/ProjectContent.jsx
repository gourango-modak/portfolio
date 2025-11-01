import { Breadcrumb } from "../../components/common/Breadcrumb";
import EditorJsContentRenderer from "../../components/editorJs/EditorJsContentRenderer";
import { truncateBreadcrumb } from "../../utils/common";
import ProjectDetailPageHeader from "./ProjectDetailPageHeader";
import ProjectLinks from "./ProjectLinks";
import { ProjectTags } from "./ProjectTags";

export const ProjectContent = ({ project }) => {
    const crumbs = [
        { to: "/", label: "Home" },
        { to: "/projects", label: "Projects" },
        { label: truncateBreadcrumb(project.title) },
    ];

    return (
        <div className="lg:flex-1 lg:min-w-0">
            <Breadcrumb crumbs={crumbs} />
            <ProjectDetailPageHeader project={project} />
            <EditorJsContentRenderer content={project.content} />

            <ProjectLinks liveUrl={project.liveUrl} repoUrl={project.repoUrl} />
            <ProjectTags tags={project.tags} />
        </div>
    );
};
