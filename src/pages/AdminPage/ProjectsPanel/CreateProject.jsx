import { memo, useEffect, useMemo, useRef, useState } from "react";
import EditorJs from "../../../components/editorJs/EditorJs";
import {
    getEditorJsInitialData,
    getEditorJsTools,
} from "../../../components/editorJs/config";
import { downloadJson, getContentFileName } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPES } from "../../../config";
import { ScrollButtons } from "../../../components/common/ScrollButtons";
import { prepareProjectData } from "./../../../components/project/projectUtils";
import ProjectMetaDataModal from "./../../../components/project/ProjectMetaDataModal";
import { fetchAllCategories } from "../../../data/categories";
import { useAlert } from "../../../context/AlertProvider";
import {
    downloadContentImages,
    processContentData,
} from "../../../components/editorJs/utils";

// Memoized EditorJs to prevent re-renders
const MemoizedEditorJs = memo(EditorJs);

export const CreateProject = () => {
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const editorRef = useRef(null);
    const editorJsFinalDataRef = useRef(null);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [editorJsInitData, setEditorJsInitData] = useState(
        getEditorJsInitialData(CONTENT_TYPES.PROJECT)
    );
    const [metaData, setMetaData] = useState({});

    const NEW_PROJECT_STORE_KEY = "gm-new-project";

    const editorJsTools = useMemo(
        () => getEditorJsTools(CONTENT_TYPES.PROJECT),
        []
    );

    const clearProject = () => {
        localStorage.removeItem(NEW_PROJECT_STORE_KEY);
    };

    const loadProject = (project) => {
        const projectObj = JSON.parse(project);
        setMetaData(projectObj.metaData);
        setEditorJsInitData(projectObj.content);
    };

    useEffect(() => {
        const project = localStorage.getItem(NEW_PROJECT_STORE_KEY);
        if (project) {
            showAlert("Would you like to continue from where you left off?", {
                type: "info",
                buttons: [
                    {
                        label: "Cancel",
                        type: "secondary",
                        onClick: clearProject,
                    },
                    {
                        label: "Okay",
                        type: "primary",
                        onClick: () => loadProject(project),
                    },
                ],
            });
        }
    }, []);

    const handleOnChange = async (options) => {
        if (editorRef.current) {
            await editorRef.current.save(options);
        }
    };

    const handleDataAfterSave = async ({ content }) => {
        if (content) {
            editorJsFinalDataRef.current = content;

            localStorage.setItem(
                NEW_PROJECT_STORE_KEY,
                JSON.stringify({
                    content,
                    metaData: null,
                })
            );
        }
    };

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchAllCategories();
            setCategories(categories);
        };

        loadCategories();
    }, []);

    // Handle Ctrl+S / Cmd+S save shortcut
    useEffect(() => {
        const handleKeyDown = async (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();

                if (editorRef.current) {
                    await editorRef.current.save();
                }

                setMetaDataModalOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const saveMetaData = async (meta) => {
        const newProject = prepareProjectData(
            editorJsFinalDataRef.current,
            meta
        );
        downloadContentImages(newProject);
        downloadJson(
            processContentData(newProject),
            getContentFileName(newProject.id)
        );
        setMetaDataModalOpen(false);
        navigate("/admin/projects");
    };

    const handleMetaDataModalClose = (meta) => {
        setMetaDataModalOpen(false);
        setMetaData(meta);

        const project = localStorage.getItem(NEW_PROJECT_STORE_KEY);

        if (project) {
            const projectObj = JSON.parse(project);
            localStorage.setItem(
                NEW_PROJECT_STORE_KEY,
                JSON.stringify({
                    content: projectObj.content,
                    metaData: meta,
                })
            );
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto lg:px-4 pt-2 relative">
                <div className="bg-white px-6 md:pr-21 flex flex-col">
                    <div className="flex-1 min-h-[70vh]">
                        <MemoizedEditorJs
                            ref={editorRef}
                            onSave={handleDataAfterSave}
                            onChange={handleOnChange}
                            initialData={editorJsInitData}
                            tools={editorJsTools}
                        />
                    </div>
                </div>
                <ScrollButtons />
            </div>
            <ProjectMetaDataModal
                isOpen={isMetaDataModalOpen}
                onClose={handleMetaDataModalClose}
                onSave={saveMetaData}
                initialData={metaData}
                categories={categories}
            />
        </>
    );
};
