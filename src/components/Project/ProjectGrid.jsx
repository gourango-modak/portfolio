import { useState } from "react";
import ProjectCard from "./ProjectCard";
import EditorJsModal from "../editorJs/EditorJsModal";
import ProjectMetaDataModal from "./ProjectMetaDataModal";
import { downloadJson, getContentFileName } from "../../utils/common";
import { prepareProjectData } from "./projectUtils";
import { CONTENT_TYPES } from "../../config";

const ProjectGrid = ({ projects }) => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isProjectMetaDataModalOpen, setIsProjectMetaDataModalOpen] =
        useState(false);
    const [editorJsData, setEditorJsData] = useState(null);
    const [metaData, setMetaData] = useState(null);

    const handleEditorJsModalSave = (data) => {
        setEditorJsData(data);
        setIsEditorModalOpen(false);
        setIsProjectMetaDataModalOpen(true);
    };

    const handleEditorJsModalClose = () => {
        setEditorJsData(null);
        setMetaData(null);
        setIsEditorModalOpen(false);
    };

    const handleProjectMetaDataModalClose = () => {
        setIsProjectMetaDataModalOpen(false);
        setIsEditorModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const handleProjectMetaDataModalSave = (metaData) => {
        const projectData = prepareProjectData(editorJsData, metaData);
        downloadJson(
            projectData,
            getContentFileName(projectData.title, projectData.id)
        );

        setIsProjectMetaDataModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const handleProjectMetaDataModalBack = (metaData) => {
        setMetaData(metaData);
        setIsProjectMetaDataModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handleEdit = (post) => {
        setIsEditorModalOpen(true);
        setEditorJsData(post.content);
        setMetaData(post);
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
                initialData={editorJsData}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.PROJECT}
            />
            <ProjectMetaDataModal
                isOpen={isProjectMetaDataModalOpen}
                onClose={handleProjectMetaDataModalClose}
                onSave={handleProjectMetaDataModalSave}
                onBack={handleProjectMetaDataModalBack}
                initialData={metaData}
            />
        </>
    );
};

export default ProjectGrid;
