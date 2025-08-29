import { useRef, useState } from "react";
import Modal from "../common/Modal";
import BlogPostEditor from "./BlogPostEditor";
import BlogPostSaveModal from "./BlogPostSaveModal";

const BlogPostModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [post, setPost] = useState(null);
    // Create a ref to hold the BlogEditor component instance.
    const editorRef = useRef(null);

    const handleSaveClick = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleDataAfterSave = (post) => {
        setPost(post);
        setIsModalOpen(true);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Blog"
            width="w-6xl"
            showHeader={false}
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveClick}
                        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-700"
                    >
                        Save
                    </button>
                </>
            }
        >
            <BlogPostEditor ref={editorRef} onSave={handleDataAfterSave} />
            <BlogPostSaveModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    onClose();
                }}
                post={post}
            />
        </Modal>
    );
};

export default BlogPostModal;
