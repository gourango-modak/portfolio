import { PlusCircle } from "lucide-react";
import { ISDEVENV } from "../config/config";
import { useState } from "react";
import { fetchAllBlogs } from "../data/blogs";
import BlogModal from "../components/blog/BlogModal";
import DataLoader from "../components/common/DataLoader";
import { BlogList } from "../components/blog/BlogList";

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
                        <div className={ISDEVENV ? "" : "hidden"}>
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
                        fetchData={fetchAllBlogs}
                        render={(blogs) => <BlogList blogs={blogs} />}
                    />
                </div>
            </section>
            <BlogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Blog;
