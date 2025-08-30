import ProjectCard from "../components/project/ProjectCard";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import ProjectModal from "../components/Project/ProjectModal";
import DataLoader from "../components/common/DataLoader";
import { fetchProjects } from "../data/projects";
import { CONFIG } from "../config/config";
import EditorModal from "../components/common/EditorJs/EditorModal";
import Editor from "../components/common/EditorJs/Editor";
import { validateEditorModalForProject } from "../utils/validation";
import { getProjectTools } from "../utils/editor";

const Projects = () => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editorData, setEditorData] = useState(null);

    const handleSave = (data) => {
        setEditorData(data);
        setIsEditorModalOpen(false);
        setIsProjectModalOpen(true);
    };

    const handleEditorModalClose = () => {
        setEditorData(null);
        setIsEditorModalOpen(false);
    };

    const handleProjectModalClose = () => {
        setIsProjectModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handleProjectModalSave = () => {
        setIsProjectModalOpen(false);
        setIsEditorModalOpen(false);
        setEditorData(null);
    };

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Portfolio
                        </h1>
                        <div className={CONFIG.IS_DEVENV ? "" : "hidden"}>
                            <button
                                onClick={() => setIsEditorModalOpen(true)}
                                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                            >
                                <PlusCircle size={20} /> Add
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                        Explore a curated selection of my projects. Each one
                        represents a unique challenge and a step forward in my
                        journey as a developer.
                    </p>
                    <DataLoader
                        fetchData={fetchProjects}
                        render={(projects) => (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                            </div>
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
