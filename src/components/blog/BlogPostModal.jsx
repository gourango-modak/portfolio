import { useRef } from "react";
import Modal from "../common/Modal";
import BlogPostEditor from "./BlogPostEditor";

const BlogPostModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    // Create a ref to hold the BlogEditor component instance.
    const editorRef = useRef(null);

    const handleSaveClick = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleDataAfterSave = (blogData) => {
        console.log("Data received from editor:", blogData);
        const jsonString = JSON.stringify(blogData, null, 2);
        const blob = new Blob([jsonString], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${
            blogData.id +
            "_" +
            blogData.title.toLowerCase().replace(/\s+/g, "-")
        }.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
                        Save & Download JSON
                    </button>
                </>
            }
        >
            <BlogPostEditor ref={editorRef} onSave={handleDataAfterSave} />
        </Modal>
    );
};

export default BlogPostModal;
