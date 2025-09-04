import { useRef } from "react";
import { useAlertModal } from "../../hooks/useAlertModal";
import Modal from "../Modal/Modal";
import EditorJs from "./EditorJs";
import { getEditorJsTools } from "../../config/editorJs/editorTools";
import { validateEditorJsModal } from "../../utils/validation";

const EditorJsModal = ({
    isOpen,
    onClose,
    title,
    onSave,
    initialData,
    actionBtnTitle = "Save",
    contentType,
}) => {
    const editorRef = useRef(null);
    const { showAlert, AlertModal } = useAlertModal();

    const handleSaveClick = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleDataAfterSave = (editorData) => {
        const isValid = validateEditorJsModal(
            contentType,
            editorData,
            showAlert
        );
        if (!isValid) return;
        onSave(editorData);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                style={{
                    width: "w-7xl",
                    padding: "px-6 pb-6 pt-12",
                    minHeight: "min-h-[80vh]",
                }}
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
                <EditorJs
                    ref={editorRef}
                    onSave={handleDataAfterSave}
                    initialData={initialData}
                    tools={getEditorJsTools(contentType)}
                />
            </Modal>
            <AlertModal />
        </>
    );
};

export default EditorJsModal;
