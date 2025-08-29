import { useState } from "react";
import EditorModal from "../common/EditorModal";
import Editor from "../common/Editor";
import BlogPostSaveModal from "./BlogPostSaveModal";

const BlogPostModal = ({ isOpen, setIsOpen, onClose }) => {
    const [isBlogPostSaveModalOpen, setIsBlogPostSaveModalOpen] =
        useState(false);
    const [post, setPost] = useState(null);

    const handleSave = (data) => {
        setPost(data);
        onClose();
        setIsBlogPostSaveModalOpen(true);
    };

    const handleBlogPostSaveModalClose = () => {
        setIsBlogPostSaveModalOpen(false);
        setIsOpen(true);
    };

    return (
        <>
            <EditorModal
                isOpen={isOpen}
                onClose={onClose}
                title="Create Blog"
                EditorComponent={Editor}
                onSave={handleSave}
            />

            <BlogPostSaveModal
                isOpen={isBlogPostSaveModalOpen}
                onClose={handleBlogPostSaveModalClose}
                post={post}
            />
        </>
    );
};

export default BlogPostModal;
