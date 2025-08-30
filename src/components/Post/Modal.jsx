import { useState } from "react";
import { CONTENT_TYPES } from "./../../config";
import PostMetaDataModal from "./MetaDataModal";
import { getEditorJsInitialData } from "../../config/editorJs/editorTools";
import EditorJsModal from "./../EditorJs/Modal";

const PostModal = ({ isOpen, setIsOpen, onClose }) => {
    const contentType = CONTENT_TYPES.BLOG;
    const [isPostMetaDataModalOpen, setIsPostMetaDataModalOpen] =
        useState(false);
    const [editorJsData, setEditorJsData] = useState(
        getEditorJsInitialData(contentType)
    );

    const handleEditorJsModalSave = (data) => {
        setEditorJsData(data);
        onClose();
        setIsPostMetaDataModalOpen(true);
    };

    const handlePostSaveModalClose = () => {
        setIsPostMetaDataModalOpen(false);
        setIsOpen(true);
    };

    const handlePostSaveModalSave = () => {
        setIsPostMetaDataModalOpen(false);
        setIsOpen(false);
        setEditorJsData(getEditorJsInitialData(contentType));
    };

    const handleEditorJsModalClose = () => {
        setEditorJsData(getEditorJsInitialData(contentType));
        onClose();
    };

    return (
        <>
            <EditorJsModal
                isOpen={isOpen}
                onClose={handleEditorJsModalClose}
                onSave={handleEditorJsModalSave}
                initialData={editorJsData}
                actionBtnTitle="Next"
                contentType={contentType}
            />

            <PostMetaDataModal
                isOpen={isPostMetaDataModalOpen}
                onClose={handlePostSaveModalClose}
                onSave={handlePostSaveModalSave}
                editorJsData={editorJsData}
            />
        </>
    );
};

export default PostModal;
