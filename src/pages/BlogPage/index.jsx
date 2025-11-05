import BlogPageHeader from "./BlogPageHeader";
import { usePostFilters } from "./../../components/post/hooks/usePostFilters";
import PostsList from "../../components/post/PostsList";
import SearchInput from "./../../components/common/SearchInput";
import TagFilter from "./../../components/common/TagFilter";

const BlogPage = () => {
    const {
        searchTerm,
        setSearchTerm,
        selectedTags,
        setSelectedTags,
        topTags,
        fetchData,
    } = usePostFilters();

    return (
        <section className="pt-30 pb-30 section-m-h bg-gray-50/50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-7xl">
                <BlogPageHeader />
                <div className="mb-12">
                    <SearchInput onSearch={setSearchTerm} />
                    <TagFilter
                        topTags={topTags}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        allLabel="All Posts"
                    />
                </div>

                <PostsList
                    fetchData={fetchData}
                    searchTerm={searchTerm}
                    selectedTag={selectedTags}
                />
            </div>
        </section>
    );
};

export default BlogPage;
