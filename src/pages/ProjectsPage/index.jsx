import { useState } from "react";
import ProjectPageHeader from "./Header";
import DataLoader from "../../components/Common/DataLoader";
import ProjectList from "../../components/Project/List";
import { fetchProjects } from "../../data/projects";
import { CONTENT_TYPES } from "../../config";
import { getProjectInitialData } from "./../../utils/common";
import ProjectMetaDataModal from "../../components/Project/MetaDataModal";
import EditorJsModal from "../../components/EditorJs/Modal";

const ProjectsPage = () => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isProjectMetaDataModalOpen, setIsProjectMetaDataModalOpen] =
        useState(false);
    const [projectData, setProjectData] = useState(getProjectInitialData());

    const handleOnAddClick = () => {
        setProjectData(getProjectInitialData());
        setIsEditorModalOpen(true);
    };

    const handleEditorJsModalSave = (data) => {
        setProjectData((prev) => ({ ...prev, content: data }));
        setIsProjectMetaDataModalOpen(true);
        setIsEditorModalOpen(false);
    };

    const handleProjectMetaDataModalClose = () => {
        setIsProjectMetaDataModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handleProjectMetaDataModalSave = () => {
        setIsProjectMetaDataModalOpen(false);
        setProjectData(null);
    };

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <ProjectPageHeader onAddClick={handleOnAddClick} />
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
                onClose={() => setIsEditorModalOpen(false)}
                onSave={handleEditorJsModalSave}
                initialData={projectData?.content}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.PROJECT}
            />
            <ProjectMetaDataModal
                isOpen={isProjectMetaDataModalOpen}
                onClose={handleProjectMetaDataModalClose}
                onSave={handleProjectMetaDataModalSave}
                initialData={projectData}
            />
        </>
    );
};

export default ProjectsPage;
