import { useState } from "react";
import ProjectCard from "./ProjectCard";
import EditorJsModal from "../EditorJs/EditorJsModal";
import ProjectMetaDataModal from "./ProjectMetaDataModal";
import { CONTENT_TYPES } from "../../config/config";

const ProjectGrid = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isProjectMetaDataModalOpen, setIsProjectMetaDataModalOpen] =
        useState(false);

    const handleOnAddClick = () => {
        setSelectedProject(getProjectInitialData());
        setIsEditorModalOpen(true);
    };

    const handleEditorJsModalSave = (data) => {
        setSelectedProject((prev) => ({ ...prev, content: data }));
        setIsProjectMetaDataModalOpen(true);
        setIsEditorModalOpen(false);
    };

    const handleEditorJsModalClose = () => {
        setSelectedProject(null);
        setIsEditorModalOpen(false);
    };

    const handleProjectMetaDataModalClose = () => {
        setIsProjectMetaDataModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handleProjectMetaDataModalSave = () => {
        setIsProjectMetaDataModalOpen(false);
        setSelectedProject(null);
    };

    const handleEdit = (post) => {
        setSelectedProject(post);
        setIsEditorModalOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
            <EditorJsModal
                isOpen={isEditorModalOpen}
                onClose={handleEditorJsModalClose}
                onSave={handleEditorJsModalSave}
                initialData={selectedProject?.content}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.PROJECT}
            />
            <ProjectMetaDataModal
                isOpen={isProjectMetaDataModalOpen}
                onClose={handleProjectMetaDataModalClose}
                onSave={handleProjectMetaDataModalSave}
                initialData={selectedProject}
            />
        </>
    );
};

export default ProjectGrid;
