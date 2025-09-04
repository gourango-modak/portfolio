import { useState } from "react";
import PostCard from "./PostCard";
import EditorJsModal from "../EditorJs/EditorJsModal";
import PostMetaDataModal from "./PostMetaDataModal";
import { CONTENT_TYPES } from "../../config/config";
import { downloadJson, getFileName, preparePostData } from "../../utils/common";

const PostGrid = ({ posts }) => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isPostMetaDataModalOpen, setIsPostMetaDataModalOpen] =
        useState(false);
    const [editorJsData, setEditorJsData] = useState(null);
    const [metaData, setMetaData] = useState(null);

    const handleEditorJsModalSave = (data) => {
        setEditorJsData(data);
        setIsEditorModalOpen(false);
        setIsPostMetaDataModalOpen(true);
    };

    const handleEditorJsModalClose = () => {
        setEditorJsData(null);
        setMetaData(null);
        setIsEditorModalOpen(false);
    };

    const handlePostMetaDataModalClose = () => {
        setIsPostMetaDataModalOpen(false);
        setIsEditorModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const handlePostMetaDataModalSave = (metaData) => {
        const postData = preparePostData(editorJsData, metaData);
        downloadJson(postData, getFileName(postData.title, postData.id));

        setIsPostMetaDataModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const handlePostMetaDataModalBack = (metaData) => {
        setMetaData(metaData);
        setIsPostMetaDataModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handleEdit = (post) => {
        setIsEditorModalOpen(true);
        setEditorJsData(post.content);
        setMetaData(post);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} onEdit={handleEdit} />
                ))}
            </div>
            <EditorJsModal
                isOpen={isEditorModalOpen}
                onClose={handleEditorJsModalClose}
                onSave={handleEditorJsModalSave}
                initialData={editorJsData}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.BLOG}
            />
            <PostMetaDataModal
                isOpen={isPostMetaDataModalOpen}
                onClose={handlePostMetaDataModalClose}
                onSave={handlePostMetaDataModalSave}
                onBack={handlePostMetaDataModalBack}
                initialData={metaData}
            />
        </>
    );
};

export default PostGrid;
