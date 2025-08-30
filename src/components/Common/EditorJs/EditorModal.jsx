import { useRef } from "react";
import Modal from "../Modal";
import { useAlertModal } from "../../../hooks/useAlertModal";

const EditorModal = ({
    isOpen,
    onClose,
    title,
    EditorComponent,
    onSave,
    editorInitialData,
    actionBtnTitle = "Save",
    validateBeforeSave,
    editorTools,
}) => {
    if (!isOpen) return null;
    const editorRef = useRef(null);
    const { showAlert, AlertModal } = useAlertModal();

    const handleSaveClick = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleDataAfterSave = (editorData) => {
        if (validateBeforeSave) {
            const isValid = validateBeforeSave(editorData, showAlert);
            if (!isValid) return;
        }
        onSave(editorData);
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
                        tools={editorTools}
                    />
                )}
            </Modal>
            <AlertModal />
        </>
    );
};

export default EditorModal;
