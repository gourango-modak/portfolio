import { useEffect, useRef, useState } from "react";
import EditorJs from "../../../components/editorJs/EditorJs";
import { getEditorJsTools } from "../../../components/editorJs/editorJsConfig";
import { downloadJson, getContentFileName } from "../../../utils/common";
import { fetchPostBySlug } from "../../../data/posts";
import { useNavigate, useParams } from "react-router-dom";
import ResourceLoader from "../../../components/common/ResourceLoader";
import { CONTENT_TYPES } from "../../../config";
import PostMetaDataModal from "../../../components/post/PostMetaDataModal";
import { ScrollButtons } from "../../../components/common/ScrollButtons";

export const BlogEditor = () => {
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
        const postData = await fetchPostBySlug(slug);
        const updatedPost = {
            ...postData,
            ...meta,
            content: editorJsDataRef.current,
        };
        downloadJson(updatedPost, getContentFileName(updatedPost.id));
        setMetaDataModalOpen(false);
        navigate("/admin/blogs");
    };

    return (
        <ResourceLoader
            id={slug}
            fetchFn={fetchPostBySlug}
            loadingMessage="Fetching post data..."
        >
            {(post) => {
                return (
                    <>
                        <div className="max-w-7xl mx-auto lg:px-4 pt-2 relative">
                            <div className="bg-white px-6 md:pr-21 flex flex-col">
                                <div className="flex-1 min-h-[70vh]">
                                    <EditorJs
                                        ref={editorRef}
                                        onSave={handleDataAfterSave}
                                        initialData={post.content}
                                        tools={getEditorJsTools(
                                            CONTENT_TYPES.BLOG
                                        )}
                                    />
                                </div>
                            </div>
                            <ScrollButtons />
                        </div>
                        <PostMetaDataModal
                            isOpen={isMetaDataModalOpen}
                            onClose={() => setMetaDataModalOpen(false)}
                            onSave={saveMetaData}
                            initialData={post}
                            title="Edit Post"
                        />
                    </>
                );
            }}
        </ResourceLoader>
    );
};
