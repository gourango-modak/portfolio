import { useState } from "react";
import BlogPageHeader from "./Header";
import DataLoader from "./../../components/Common/DataLoader";
import PostList from "./../../components/Post/List";
import PostModal from "./../../components/Post/Modal";
import { fetchPosts } from "../../data/posts";

const BlogPage = () => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [postData, setPostData] = useState(null);

    const handlePostModalClose = () => {
        setIsPostModalOpen(false);
        setPostData(null);
    };

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50/50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <BlogPageHeader
                        onAddClick={() => setIsPostModalOpen(true)}
                    />
                    <DataLoader
                        fetchData={fetchPosts}
                        render={(posts) => <PostList posts={posts} />}
                    />
                </div>
            </section>
            <PostModal
                isOpen={isPostModalOpen}
                setIsOpen={setIsPostModalOpen}
                onClose={handlePostModalClose}
                postData={postData}
                setPostData={setPostData}
            />
        </>
    );
};

export default BlogPage;
