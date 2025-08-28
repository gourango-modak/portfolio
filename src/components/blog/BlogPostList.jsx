import { useMemo, useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { Search } from "lucide-react";

export const BlogPostList = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);

    // Calculate the top 10 most used tags
    const topTags = useMemo(() => {
        const tagCounts = posts
            .flatMap((post) => (Array.isArray(post.tags) ? post.tags : []))
            .reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {});
        return Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([tag]) => tag);
    }, [posts]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const titleMatch = post.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const tagMatch = selectedTag
                ? post.tags.includes(selectedTag)
                : true;
            return titleMatch && tagMatch;
        });
    }, [searchTerm, selectedTag, posts]);

    return (
        <>
            {/* Search and Filter Section */}
            <div className="mb-12">
                {/* Search Bar */}
                <div className="relative max-w-lg mx-auto mb-6">
                    <input
                        type="text"
                        placeholder="Search articles by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 outline-none rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>

                {/* Tag Cloud */}
                <div className="flex flex-wrap justify-center items-center gap-2">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                            !selectedTag
                                ? "bg-indigo-600 text-white shadow"
                                : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                        All Posts
                    </button>
                    {topTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                                selectedTag === tag
                                    ? "bg-indigo-600 text-white shadow"
                                    : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
        </>
    );
};

export default BlogPostList;
