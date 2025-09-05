import { useMemo, useState } from "react";
import SearchBar from "../common/SearchBar";
import TagFilter from "../common/TagFilter";
import PostGrid from "./PostGrid";

const PostList = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);

    // Calculate top 10 tags
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

    // Filter posts based on search & selected tag
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
            <div className="mb-12">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <TagFilter
                    topTags={topTags}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    allLabel="All Posts"
                />
            </div>
            <PostGrid posts={filteredPosts} />
        </>
    );
};

export default PostList;
