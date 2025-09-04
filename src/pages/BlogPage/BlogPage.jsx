import { useState } from "react";
import BlogPageHeader from "./BlogPageHeader";
import DataLoader from "../../components/Common/DataLoader";
import PostList from "./../../components/Post/PostList";
import { fetchPosts } from "../../data/posts";
import EditorJsModal from "../../components/EditorJs/EditorJsModal";
import { CONTENT_TYPES } from "../../config/config";
import PostMetaDataModal from "../../components/Post/PostMetaDataModal";
import { downloadJson, getFileName, preparePostData } from "../../utils/common";

const BlogPage = () => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isPostMetaDataModalOpen, setIsPostMetaDataModalOpen] =
        useState(false);
    const [editorJsData, setEditorJsData] = useState(null);
    const [metaData, setMetaData] = useState(null);

    const handleAddPost = () => {
        setIsEditorModalOpen(true);
        setEditorJsData(null);
        setMetaData(null);
    };

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

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50/50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <BlogPageHeader onAddClick={handleAddPost} />
                    <DataLoader
                        fetchData={fetchPosts}
                        render={(posts) => <PostList posts={posts} />}
                    />
                </div>
            </section>
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

export default BlogPage;
