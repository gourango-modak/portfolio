import { useState } from "react";
import { getEditorJsInitialData } from "../../config/editorJs/editorTools";
import ProjectPageHeader from "./Header";
import DataLoader from "../../components/Common/DataLoader";
import ProjectList from "../../components/Project/List";
import EditorJsModal from "../../components/EditorJs/Modal";
import ProjectModal from "../../components/Project/Modal";
import { CONTENT_TYPES } from "../../config";
import { fetchProjects } from "../../data/projects";

const ProjectsPage = () => {
    const [isEditorJsModalOpen, setIsEditorJsModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const contentType = CONTENT_TYPES.PROJECT;
    const [editorJsData, setEditorJsData] = useState(
        getEditorJsInitialData(contentType)
    );

    const handleSave = (data) => {
        setEditorJsData(data);
        setIsEditorJsModalOpen(false);
        setIsProjectModalOpen(true);
    };

    const handleEditorJsModalClose = () => {
        setEditorJsData(getEditorJsInitialData(contentType));
        setIsEditorJsModalOpen(false);
    };

    const handleProjectModalClose = () => {
        setIsProjectModalOpen(false);
        setIsEditorJsModalOpen(true);
    };

    const handleProjectModalSave = () => {
        setIsProjectModalOpen(false);
        setIsEditorJsModalOpen(false);
        setEditorJsData(getEditorJsInitialData(contentType));
    };

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <ProjectPageHeader
                        onAddClick={() => setIsEditorJsModalOpen(true)}
                    />
                    <DataLoader
                        fetchData={fetchProjects}
                        render={(projects) => (
                            <ProjectList projects={projects} />
                        )}
                    />
                </div>
            </section>
            <EditorJsModal
                isOpen={isEditorJsModalOpen}
                onClose={handleEditorJsModalClose}
                onSave={handleSave}
                initialData={editorJsData}
                actionBtnTitle="Next"
                contentType={contentType}
            />
            <ProjectModal
                isOpen={isProjectModalOpen}
                onClose={handleProjectModalClose}
                onSave={handleProjectModalSave}
                editorJsData={editorJsData}
            />
        </>
    );
};

export default ProjectsPage;
