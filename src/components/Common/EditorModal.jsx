import { useRef } from "react";
import Modal from "../common/Modal";

const EditorModal = ({ isOpen, onClose, title, EditorComponent, onSave }) => {
    if (!isOpen) return null;
    const editorRef = useRef(null);

    const handleSaveClick = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleDataAfterSave = (data) => {
        onSave(data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            width="w-6xl"
            showHeader={title ? true : false}
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
            {/* Render the dynamic editor */}
            {EditorComponent && (
                <EditorComponent ref={editorRef} onSave={handleDataAfterSave} />
            )}
        </Modal>
    );
};

export default EditorModal;
