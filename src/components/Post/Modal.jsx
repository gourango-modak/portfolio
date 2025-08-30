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

    const handleBlogPostSaveModalClose = () => {
        setIsPostMetaDataModalOpen(false);
        setIsOpen(true);
    };

    const handleBlogPostSaveModalSave = () => {
        setIsPostMetaDataModalOpen(false);
        setIsOpen(false);
        setEditorJsData(getBlogEditorInitialData());
    };

    const handleEditorJsModalClose = () => {
        setEditorJsData(getBlogEditorInitialData());
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
                onClose={handleBlogPostSaveModalClose}
                onSave={handleBlogPostSaveModalSave}
                editorJsData={editorJsData}
            />
        </>
    );
};

export default PostModal;
