import { useState } from "react";
import EditorModal from "../common/EditorModal";
import Editor from "../common/Editor";
import BlogPostSaveModal from "./BlogPostSaveModal";

const BlogPostModal = ({ isOpen, setIsOpen, onClose }) => {
    const [isBlogPostSaveModalOpen, setIsBlogPostSaveModalOpen] =
        useState(false);
    const [postData, setPostData] = useState(null);

    const handleSave = (data) => {
        setPostData(data);
        onClose();
        setIsBlogPostSaveModalOpen(true);
    };

    const handleBlogPostSaveModalClose = () => {
        setIsBlogPostSaveModalOpen(false);
        setIsOpen(true);
    };

    const handleEditorModalClose = () => {
        setPostData(null);
        onClose();
    };

    return (
        <>
            <EditorModal
                isOpen={isOpen}
                onClose={handleEditorModalClose}
                EditorComponent={Editor}
                onSave={handleSave}
                editorInitialData={postData}
            />

            <BlogPostSaveModal
                isOpen={isBlogPostSaveModalOpen}
                onClose={handleBlogPostSaveModalClose}
                postData={postData}
            />
        </>
    );
};

export default BlogPostModal;
