import { memo, useEffect, useMemo, useRef, useState } from "react";
import EditorJs from "../../../components/editorJs/EditorJs";
import {
    getEditorJsInitialData,
    getEditorJsTools,
} from "../../../components/editorJs/editorJsConfig";
import { downloadJson, getContentFileName } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPES } from "../../../config";
import PostMetaDataModal from "../../../components/post/PostMetaDataModal";
import { ScrollButtons } from "../../../components/common/ScrollButtons";
import { preparePostData } from "../../../components/post/postUtils";

// Memoized EditorJs to prevent re-renders
const MemoizedEditorJs = memo(EditorJs);

export const CreateBlog = () => {
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);
    const editorRef = useRef(null);
    const editorJsDataRef = useRef(null);
    const metaDataRef = useRef({});
    const navigate = useNavigate();

    const editorJsTools = useMemo(
        () => getEditorJsTools(CONTENT_TYPES.BLOG),
        []
    );
    const editorJsInitData = useMemo(
        () => getEditorJsInitialData(CONTENT_TYPES.BLOG),
        []
    );

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
        const newPost = preparePostData(editorJsDataRef.current, meta);
        downloadJson(newPost, getContentFileName(newPost.id));
        setMetaDataModalOpen(false);
        navigate("/admin/blogs");
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
            <PostMetaDataModal
                isOpen={isMetaDataModalOpen}
                onClose={handleMetaDataModalClose}
                onSave={saveMetaData}
                initialData={metaDataRef.current}
            />
        </>
    );
};
