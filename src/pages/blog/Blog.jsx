import { useState } from "react";
import { fetchPosts } from "../../data/posts";
import BlogPostModal from "../../components/blog/BlogPostModal";
import DataLoader from "../../components/common/DataLoader";
import BlogPostList from "../../components/blog/BlogPostList";
import HeaderSection from "./HeaderSection";

const Blog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postData, setPostData] = useState(null);

    const handleBlogPostModalClose = () => {
        setIsModalOpen(false);
        setPostData(null);
    };

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50/50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <HeaderSection onAddClick={() => setIsModalOpen(true)} />
                    <DataLoader
                        fetchData={fetchPosts}
                        render={(posts) => <BlogPostList posts={posts} />}
                    />
                </div>
            </section>
            <BlogPostModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onClose={handleBlogPostModalClose}
                postData={postData}
                setPostData={setPostData}
            />
        </>
    );
};

export default Blog;
