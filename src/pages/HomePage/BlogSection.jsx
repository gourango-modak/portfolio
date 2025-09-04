import { Link } from "react-router-dom";
import DataLoader from "./../../components/Common/DataLoader";
import PostCard from "./../../components/Post/PostCard";
import { fetchPosts } from "./../../data/posts";
import Section from "../../components/Section";
import SectionHeader from "../../components/Section/Header";

const BlogSection = () => {
    return (
        <Section bgClass="bg-white/50">
            <SectionHeader
                title="From My Blog"
                text="I write about technology, development, and everything in
                    between. Here are some of my latest articles."
            />
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
        </Section>
    );
};

export default BlogSection;
