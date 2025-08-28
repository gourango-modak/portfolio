import { PlusCircle } from "lucide-react";
import { CONFIG } from "../config/config";
import { useState } from "react";
import { fetchPosts } from "../data/posts";
import BlogPostModal from "../components/blog/BlogPostModal";
import DataLoader from "../components/common/DataLoader";
import BlogPostList from "../components/blog/BlogPostList";

const Blog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="pt-24 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold text-slate-900">
                            My Writings
                        </h1>
                        <div className={CONFIG.IS_DEVENV ? "" : "hidden"}>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                            >
                                <PlusCircle size={20} /> Add
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                        Here I share my thoughts on software development, .NET,
                        and the tech world.
                    </p>
                    <DataLoader
                        fetchData={fetchPosts}
                        render={(posts) => <BlogPostList posts={posts} />}
                    />
                </div>
            </section>
            <BlogPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Blog;
