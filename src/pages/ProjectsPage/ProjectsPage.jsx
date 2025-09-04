import { useState } from "react";
import ProjectPageHeader from "./ProjectsPageHeader";
import DataLoader from "../../components/Common/DataLoader";
import ProjectList from "../../components/Project/ProjectList";
import { fetchProjects } from "../../data/projects";
import { CONTENT_TYPES } from "../../config/config";
import ProjectMetaDataModal from "../../components/Project/ProjectMetaDataModal";
import EditorJsModal from "../../components/EditorJs/EditorJsModal";
import {
    downloadJson,
    getFileName,
    prepareProjectData,
} from "../../utils/common";

const ProjectsPage = () => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isProjectMetaDataModalOpen, setIsProjectMetaDataModalOpen] =
        useState(false);
    const [editorJsData, setEditorJsData] = useState(null);
    const [metaData, setMetaData] = useState(null);

    const handleAddProject = () => {
        setIsEditorModalOpen(true);
        setEditorJsData(null);
        setMetaData(null);
    };

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
            getFileName(projectData.title, projectData.id)
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

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <ProjectPageHeader onAdd={handleAddProject} />
                    <DataLoader
                        fetchData={fetchProjects}
                        render={(projects) => (
                            <ProjectList projects={projects} />
                        )}
                    />
                </div>
            </section>
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

export default ProjectsPage;
