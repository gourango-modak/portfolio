import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { SearchBar } from "./SearchBar";
import InfiniteScroll from "./../../../components/common/InfiniteScroll";
import { fetchPosts } from "../../../data/posts";
import PostCard from "../../../components/post/PostCard";
import { useNavigate } from "react-router-dom";

export const BlogsPanel = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const categories = ["Tutorial", "Frontend", "Backend"];
    const tags = [
        "tutorial",
        "getting-started",
        "css",
        "frontend",
        "backend",
        "data",
        "performance",
    ];

    const fetchData = useCallback(
        (page, limit) =>
            fetchPosts(page, limit, {
                searchTerm,
                selectedTags,
                selectedCategories,
            }),
        [searchTerm, selectedCategories, selectedTags]
    );

    const handleEdit = (post) => {
        navigate(`/admin/blog/${post.slug}`);
    };

    const handleCreateNewPost = () => {
        navigate("/admin/blog");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title or author..."
                />
                <div className="flex flex-col md:flex-row gap-4">
                    <MultiSelectDropdown
                        label="Categories"
                        options={categories}
                        selectedOptions={selectedCategories}
                        setSelectedOptions={setSelectedCategories}
                    />
                    <MultiSelectDropdown
                        label="Tags"
                        options={tags}
                        selectedOptions={selectedTags}
                        setSelectedOptions={setSelectedTags}
                    />
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer
                        flex items-center gap-2 justify-center"
                        onClick={handleCreateNewPost}
                    >
                        <Plus size={18} /> Create
                    </button>
                </div>
            </div>
            <InfiniteScroll
                key={`${searchTerm}-${selectedCategories.join(
                    "-"
                )}-${selectedTags.join("-")}`} // force remount on filter change
                fetchData={fetchData}
                renderItem={(post) => (
                    <PostCard key={post.id} post={post} onEdit={handleEdit} />
                )}
                limit={10}
                containerClass="grid grid-cols-1 xl:grid-cols-2 gap-4"
            />
        </div>
    );
};
