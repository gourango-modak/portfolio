import { useEffect, useRef, useState } from "react";
import EditorJs from "../../../components/editorJs/EditorJs";
import { getEditorJsTools } from "../../../components/editorJs/editorJsConfig";
import { downloadJson, getContentFileName } from "../../../utils/common";
import { useNavigate, useParams } from "react-router-dom";
import ResourceLoader from "../../../components/common/ResourceLoader";
import { CONTENT_TYPES } from "../../../config";
import { ScrollButtons } from "../../../components/common/ScrollButtons";
import { fetchProjectBySlug } from "../../../data/projects";
import ProjectMetaDataModal from "../../../components/project/ProjectMetaDataModal";
import { fetchAllCategories } from "../../../data/categories";

export const ProjectEditor = () => {
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);
    const { slug } = useParams();
    const editorRef = useRef(null);
    const editorJsDataRef = useRef(null);
    const navigate = useNavigate();

    const handleDataAfterSave = async ({ content }) => {
        if (content) {
            editorJsDataRef.current = content;
            setMetaDataModalOpen(true);
        }
    };

    // Handle Ctrl+S / Cmd+S save shortcut
    useEffect(() => {
        const handleKeyDown = async (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();

                if (editorRef.current) {
                    await editorRef.current.save();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const saveMetaData = async (meta) => {
        const projectData = await fetchProjectBySlug(slug);
        const updatedProject = {
            ...projectData,
            ...meta,
            content: editorJsDataRef.current,
        };
        downloadJson(updatedProject, getContentFileName(updatedProject.id));
        setMetaDataModalOpen(false);
        navigate("/admin/projects");
    };

    const fetchFn = async (slug) => {
        const [project, categories] = await Promise.all([
            fetchProjectBySlug(slug),
            fetchAllCategories(),
        ]);
        return { project, categories };
    };

    return (
        <ResourceLoader
            id={slug}
            fetchFn={fetchFn}
            loadingMessage="Fetching project data..."
        >
            {({ project, categories }) => {
                return (
                    <>
                        <div className="max-w-7xl mx-auto lg:px-4 pt-2 relative">
                            <div className="bg-white px-6 md:pr-21 flex flex-col">
                                <div className="flex-1 min-h-[70vh]">
                                    <EditorJs
                                        ref={editorRef}
                                        onSave={handleDataAfterSave}
                                        initialData={project.content}
                                        tools={getEditorJsTools(
                                            CONTENT_TYPES.PROJECT
                                        )}
                                    />
                                </div>
                            </div>
                            <ScrollButtons />
                        </div>
                        <ProjectMetaDataModal
                            isOpen={isMetaDataModalOpen}
                            onClose={() => setMetaDataModalOpen(false)}
                            onSave={saveMetaData}
                            initialData={project}
                            title="Edit Project"
                            categories={categories}
                        />
                    </>
                );
            }}
        </ResourceLoader>
    );
};
