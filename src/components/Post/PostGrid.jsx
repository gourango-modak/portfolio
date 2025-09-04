import { useState } from "react";
import PostCard from "./PostCard";
import EditorJsModal from "../EditorJs/EditorJsModal";
import PostMetaDataModal from "./PostMetaDataModal";
import { CONTENT_TYPES } from "../../config/config";

const PostGrid = ({ posts }) => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isPostMetaDataModalOpen, setIsPostMetaDataModalOpen] =
        useState(false);

    const handleEditorJsModalSave = (data) => {
        setSelectedPost((prev) => ({ ...prev, content: data }));
        setIsPostMetaDataModalOpen(true);
        setIsEditorModalOpen(false);
    };

    const handleEditorJsModalClose = () => {
        setSelectedPost(null);
        setIsEditorModalOpen(false);
    };

    const handlePostMetaDataModalClose = () => {
        setIsPostMetaDataModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handlePostMetaDataModalSave = () => {
        setIsPostMetaDataModalOpen(false);
        setSelectedPost(null);
    };

    const handleEdit = (post) => {
        setSelectedPost(post);
        setIsEditorModalOpen(true);
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
                initialData={selectedPost?.content}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.BLOG}
            />

            <PostMetaDataModal
                isOpen={isPostMetaDataModalOpen}
                onClose={handlePostMetaDataModalClose}
                onSave={handlePostMetaDataModalSave}
                postData={selectedPost}
            />
        </>
    );
};

export default PostGrid;
