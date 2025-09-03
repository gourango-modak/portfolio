import { useState } from "react";
import BlogPageHeader from "./Header";
import DataLoader from "./../../components/Common/DataLoader";
import PostList from "./../../components/Post/List";
import { fetchPosts } from "../../data/posts";
import { getPostInitialData } from "../../utils/common";
import EditorJsModal from "../../components/EditorJs/Modal";
import { CONTENT_TYPES } from "../../config";
import PostMetaDataModal from "../../components/Post/MetaDataModal";

const BlogPage = () => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isPostMetaDataModalOpen, setIsPostMetaDataModalOpen] =
        useState(false);
    const [postData, setPostData] = useState(null);

    const handleOnAddClick = () => {
        setPostData(getPostInitialData());
        setIsEditorModalOpen(true);
    };

    const handleEditorJsModalSave = (data) => {
        setPostData((prev) => ({ ...prev, content: data }));
        setIsPostMetaDataModalOpen(true);
        setIsEditorModalOpen(false);
    };

    const handlePostMetaDataModalClose = () => {
        setIsPostMetaDataModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handlePostMetaDataModalSave = () => {
        setIsPostMetaDataModalOpen(false);
        setPostData(null);
    };

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50/50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <BlogPageHeader onAddClick={handleOnAddClick} />
                    <DataLoader
                        fetchData={fetchPosts}
                        render={(posts) => <PostList posts={posts} />}
                    />
                </div>
            </section>
            <EditorJsModal
                isOpen={isEditorModalOpen}
                onClose={() => setIsEditorModalOpen(false)}
                onSave={handleEditorJsModalSave}
                initialData={postData?.content}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.BLOG}
            />

            <PostMetaDataModal
                isOpen={isPostMetaDataModalOpen}
                onClose={handlePostMetaDataModalClose}
                onSave={handlePostMetaDataModalSave}
                postData={postData}
            />
        </>
    );
};

export default BlogPage;
