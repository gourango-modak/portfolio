import { useState } from "react";
import ProjectModal from "../../components/Project/ProjectModal";
import DataLoader from "../../components/common/DataLoader";
import { fetchProjects } from "../../data/projects";
import EditorModal from "../../components/common/EditorJs/EditorModal";
import Editor from "../../components/common/EditorJs/Editor";
import { validateEditorModalForProject } from "../../utils/validation";
import {
    getProjectEditorInitialData,
    getProjectTools,
} from "../../config/editorJs/editorTools";
import ProjectList from "../../components/project/ProjectList";
import HeaderSection from "./HeaderSection";

const Projects = () => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editorData, setEditorData] = useState(getProjectEditorInitialData());

    const handleSave = (data) => {
        setEditorData(data);
        setIsEditorModalOpen(false);
        setIsProjectModalOpen(true);
    };

    const handleEditorModalClose = () => {
        setEditorData(getProjectEditorInitialData());
        setIsEditorModalOpen(false);
    };

    const handleProjectModalClose = () => {
        setIsProjectModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handleProjectModalSave = () => {
        setIsProjectModalOpen(false);
        setIsEditorModalOpen(false);
        setEditorData(getProjectEditorInitialData());
    };

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <HeaderSection
                        onAddClick={() => setIsEditorModalOpen(true)}
                    />
                    <DataLoader
                        fetchData={fetchProjects}
                        render={(projects) => (
                            <ProjectList projects={projects} />
                        )}
                    />
                </div>
            </section>
            <EditorModal
                isOpen={isEditorModalOpen}
                onClose={handleEditorModalClose}
                EditorComponent={Editor}
                onSave={handleSave}
                editorInitialData={editorData}
                actionBtnTitle="Next"
                validateBeforeSave={validateEditorModalForProject}
                editorTools={getProjectTools()}
            />
            <ProjectModal
                isOpen={isProjectModalOpen}
                onClose={handleProjectModalClose}
                onSave={handleProjectModalSave}
                editorData={editorData}
            />
        </>
    );
};

export default Projects;
