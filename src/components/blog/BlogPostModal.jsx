import { useState } from "react";
import EditorModal from "../common/EditorJs/EditorModal";
import Editor from "../common/EditorJs/Editor";
import { validateEditorModalForBlogPost } from "../../utils/validation";
import BlogPostSaveModal from "./BlogPostSaveModal";

const BlogPostModal = ({ isOpen, setIsOpen, onClose }) => {
    const [isBlogPostSaveModalOpen, setIsBlogPostSaveModalOpen] =
        useState(false);
    const [editorData, setEditorData] = useState(null);

    const handleSave = (data) => {
        setEditorData(data);
        onClose();
        setIsBlogPostSaveModalOpen(true);
    };

    const handleBlogPostSaveModalClose = () => {
        setIsBlogPostSaveModalOpen(false);
        setIsOpen(true);
    };

    const handleBlogPostSaveModalSave = () => {
        setIsBlogPostSaveModalOpen(false);
        setIsOpen(false);
        setEditorData(null);
    };

    const handleEditorModalClose = () => {
        setEditorData(null);
        onClose();
    };

    return (
        <>
            <EditorModal
                isOpen={isOpen}
                onClose={handleEditorModalClose}
                EditorComponent={Editor}
                onSave={handleSave}
                editorInitialData={editorData}
                validateBeforeSave={validateEditorModalForBlogPost}
            />

            <BlogPostSaveModal
                isOpen={isBlogPostSaveModalOpen}
                onClose={handleBlogPostSaveModalClose}
                onSave={handleBlogPostSaveModalSave}
                editorData={editorData}
            />
        </>
    );
};

export default BlogPostModal;
