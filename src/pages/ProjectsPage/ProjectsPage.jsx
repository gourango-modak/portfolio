import { useState } from "react";
import ProjectPageHeader from "./ProjectsPageHeader";
import DataLoader from "../../components/common/DataLoader";
import ProjectList from "../../components/project/ProjectList";
import { fetchProjects } from "../../data/projects";
import ProjectMetaDataModal from "../../components/project/ProjectMetaDataModal";
import EditorJsModal from "../../components/editorJs/EditorJsModal";
import { downloadJson, getContentFileName } from "../../utils/common";
import { CONTENT_TYPES } from "../../config";
import { prepareProjectData } from "../../components/project/projectUtils";

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
