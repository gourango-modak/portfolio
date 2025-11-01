import { memo, useEffect, useMemo, useRef, useState } from "react";
import EditorJs from "../../../components/editorJs/EditorJs";
import {
    getEditorJsInitialData,
    getEditorJsTools,
} from "../../../components/editorJs/editorJsConfig";
import { downloadJson, getContentFileName } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPES } from "../../../config";
import { ScrollButtons } from "../../../components/common/ScrollButtons";
import { prepareProjectData } from "./../../../components/project/projectUtils";
import ProjectMetaDataModal from "./../../../components/project/ProjectMetaDataModal";
import { fetchAllCategories } from "../../../data/categories";

// Memoized EditorJs to prevent re-renders
const MemoizedEditorJs = memo(EditorJs);

export const CreateProject = () => {
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const editorRef = useRef(null);
    const editorJsDataRef = useRef(null);
    const metaDataRef = useRef({});
    const navigate = useNavigate();

    const editorJsTools = useMemo(
        () => getEditorJsTools(CONTENT_TYPES.PROJECT),
        []
    );
    const editorJsInitData = useMemo(
        () => getEditorJsInitialData(CONTENT_TYPES.PROJECT),
        []
    );

    const handleDataAfterSave = async ({ content }) => {
        if (content) {
            editorJsDataRef.current = content;
            setMetaDataModalOpen(true);
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
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const saveMetaData = async (meta) => {
        const newProject = prepareProjectData(editorJsDataRef.current, meta);
        downloadJson(newProject, getContentFileName(newProject.id));
        setMetaDataModalOpen(false);
        navigate("/admin/projects");
    };

    const handleMetaDataModalClose = (meta) => {
        metaDataRef.current = meta;
        setMetaDataModalOpen(false);
    };

    return (
        <>
            <div className="max-w-6xl mx-auto lg:px-4 pt-2 relative">
                <div className="bg-white px-6 md:pr-21 flex flex-col">
                    <div className="flex-1 min-h-[70vh]">
                        <MemoizedEditorJs
                            ref={editorRef}
                            onSave={handleDataAfterSave}
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
                initialData={metaDataRef.current}
                categories={categories}
            />
        </>
    );
};
