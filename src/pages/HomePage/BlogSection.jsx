import { Link } from "react-router-dom";
import { fetchPosts } from "./../../data/posts";
import Section from "../../components/Section/Section";
import SectionHeader from "../../components/Section/SectionHeader";
import PostsList from "./../../components/post/PostsList";

const BlogSection = () => {
    return (
        <Section bgClass="bg-white/50 mb-30">
            <SectionHeader
                title="From My Blog"
                text="I write about technology, development, and everything in
                    between. Here are some of my latest articles."
            />
            <PostsList fetchData={fetchPosts} maxItems={6} />
            <div className="mt-16 text-center">
                <Link
                    to="/blog"
                    className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                    View All Posts
                </Link>
            </div>
        </Section>
    );
};

export default BlogSection;
