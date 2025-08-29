import { useRef } from "react";
import Modal from "../common/Modal";
import { useAlertModal } from "../../hooks/useAlertModal";

const EditorModal = ({
    isOpen,
    onClose,
    title,
    EditorComponent,
    onSave,
    editorInitialData,
    actionBtnTitle = "Save",
}) => {
    if (!isOpen) return null;
    const editorRef = useRef(null);
    const { showAlert, AlertModal } = useAlertModal();

    const handleSaveClick = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleDataAfterSave = (data) => {
        if (!data || (Array.isArray(data.blocks) && data.blocks.length === 0)) {
            showAlert("No content here! Please add something before saving.");
            return;
        }
        onSave(data);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                style={{ width: "w-6xl", padding: "px-6 pb-6 pt-12" }}
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
                            {actionBtnTitle}
                        </button>
                    </>
                }
            >
                {/* Render the dynamic editor */}
                {EditorComponent && (
                    <EditorComponent
                        ref={editorRef}
                        onSave={handleDataAfterSave}
                        initialData={editorInitialData}
                    />
                )}
            </Modal>
            <AlertModal />
        </>
    );
};

export default EditorModal;
