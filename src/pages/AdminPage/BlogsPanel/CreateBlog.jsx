import { memo, useEffect, useMemo, useRef, useState } from "react";
import EditorJs from "../../../components/editorJs/EditorJs";
import {
    getEditorJsInitialData,
    getEditorJsTools,
} from "../../../components/editorJs/config";
import { downloadJson, getContentFileName } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPES } from "../../../config";
import PostMetaDataModal from "../../../components/post/PostMetaDataModal";
import { ScrollButtons } from "../../../components/common/ScrollButtons";
import { preparePostData } from "../../../components/post/utils";
import { useAlert } from "../../../context/AlertProvider";
import { downloadContentImages } from "../../../components/editorJs/utils";
import { fetchAllCategories } from "../../../data/categories";

// Memoized EditorJs to prevent re-renders
const MemoizedEditorJs = memo(EditorJs);

export const CreateBlog = () => {
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);
    const editorRef = useRef(null);
    const editorJsFinalDataRef = useRef(null);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [editorJsInitData, setEditorJsInitData] = useState(
        getEditorJsInitialData(CONTENT_TYPES.BLOG)
    );
    const [categories, setCategories] = useState([]);
    const [metaData, setMetaData] = useState({});

    const NEW_BLOG_STORE_KEY = "gm-new-blog";

    const editorJsTools = useMemo(
        () => getEditorJsTools(CONTENT_TYPES.BLOG),
        []
    );

    const clearBlog = () => {
        localStorage.removeItem(NEW_BLOG_STORE_KEY);
    };

    const loadBlog = (blog) => {
        const blogObj = JSON.parse(blog);
        setMetaData(blogObj.metaData);
        setEditorJsInitData(blogObj.content);
    };

    useEffect(() => {
        const blog = localStorage.getItem(NEW_BLOG_STORE_KEY);
        if (blog) {
            showAlert("Would you like to continue from where you left off?", {
                type: "info",
                buttons: [
                    {
                        label: "Cancel",
                        type: "secondary",
                        onClick: clearBlog,
                    },
                    {
                        label: "Okay",
                        type: "primary",
                        onClick: () => loadBlog(blog),
                    },
                ],
            });
        }
    }, []);

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchAllCategories();
            setCategories(categories);
        };

        loadCategories();
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
                NEW_BLOG_STORE_KEY,
                JSON.stringify({
                    content,
                    metaData: null,
                })
            );
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

                setMetaDataModalOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const saveMetaData = async (meta) => {
        downloadContentImages(editorJsFinalDataRef.current);
        const newPost = preparePostData(editorJsFinalDataRef.current, meta);
        downloadJson(newPost, getContentFileName(newPost.id));
        setMetaDataModalOpen(false);
        navigate("/admin/blogs");
    };

    const handleMetaDataModalClose = (meta) => {
        setMetaDataModalOpen(false);
        setMetaData(meta);

        const blog = localStorage.getItem(NEW_BLOG_STORE_KEY);

        if (blog) {
            const blogObj = JSON.parse(blog);
            localStorage.setItem(
                NEW_BLOG_STORE_KEY,
                JSON.stringify({
                    content: blogObj.content,
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
            <PostMetaDataModal
                isOpen={isMetaDataModalOpen}
                onClose={handleMetaDataModalClose}
                onSave={saveMetaData}
                initialData={metaData}
                categories={categories}
            />
        </>
    );
};
