import { useEffect, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import EditorJs from "../../components/editorJs/EditorJs";
import { getEditorJsTools } from "../../components/editorJs/editorJsConfig";
import { downloadJson, getContentFileName } from "../../utils/common";
import { fetchPostBySlug } from "../../data/posts";
import { useParams } from "react-router-dom";
import ResourceLoader from "../../components/common/ResourceLoader";
import { CONTENT_TYPES } from "../../config";

export const BlogEditor = () => {
    const { slug } = useParams();
    const editorRef = useRef(null);

    const handleDataAfterSave = async ({ content, options }) => {
        if (options?.download) {
            const postData = await fetchPostBySlug(slug);
            const updatedPost = {
                ...postData,
                content: content,
            };
            downloadJson(updatedPost, getContentFileName(postData.id));
        }
    };

    const handleOnChange = async (options) => {
        if (editorRef.current) {
            await editorRef.current.save(options);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                handleOnChange({ download: true });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <ResourceLoader
            id={slug}
            fetchFn={fetchPostBySlug}
            loadingMessage="Fetching post data..."
        >
            {(post) => {
                return (
                    <div className="max-w-6xl mx-auto lg:px-4 pt-2 relative">
                        <div className="bg-white px-6 md:pr-21 flex flex-col">
                            <div className="flex-1 min-h-[70vh]">
                                <EditorJs
                                    ref={editorRef}
                                    onSave={handleDataAfterSave}
                                    onChange={handleOnChange}
                                    initialData={post.content}
                                    tools={getEditorJsTools(CONTENT_TYPES.BLOG)}
                                />
                            </div>
                        </div>
                        <div className="fixed bottom-8 right-8 md:flex flex-col gap-3 hidden">
                            <button
                                onClick={scrollToTop}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg transition cursor-pointer"
                            >
                                <ArrowUp size={20} />
                            </button>
                            <button
                                onClick={scrollToBottom}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg transition cursor-pointer"
                            >
                                <ArrowDown size={20} />
                            </button>
                        </div>
                    </div>
                );
            }}
        </ResourceLoader>
    );
};
