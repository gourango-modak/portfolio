import { Link } from "react-router-dom";
import DataLoader from "./../../components/Common/DataLoader";
import PostCard from "./../../components/Post/Card";
import { fetchPosts } from "./../../data/posts";

const BlogSection = () => {
    return (
        <section id="blog" className="py-20 bg-white/50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-2 text-slate-900">
                    From My Blog
                </h2>
                <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                    I write about technology, development, and everything in
                    between. Here are some of my latest articles.
                </p>
                <DataLoader
                    fetchData={fetchPosts}
                    render={(posts) => (
                        <>
                            <div className="space-y-8">
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                            <div className="mt-12 text-center">
                                <Link
                                    to="/blog"
                                    className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                                >
                                    Read All Posts
                                </Link>
                            </div>
                        </>
                    )}
                />
            </div>
        </section>
    );
};

export default BlogSection;
