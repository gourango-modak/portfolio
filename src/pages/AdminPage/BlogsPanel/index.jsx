import { useState } from "react";
import { Plus } from "lucide-react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { SearchBar } from "./SearchBar";
import { BlogCard } from "./BlogCard";

// Blogs Panel
export const BlogsPanel = ({ onAddOrUpdateBlog, onDeleteBlog }) => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Getting Started with Your Admin Panel",
            author: "Gourango",
            date: "2023-01-15",
            categories: ["Tutorial"],
            tags: ["tutorial", "getting-started"],
            content:
                "This is the first blog post about how to use the admin panel.",
        },
        {
            id: 2,
            title: "Understanding Tailwind CSS for React",
            author: "Jane Doe",
            date: "2023-02-20",
            categories: ["Frontend"],
            tags: ["css", "frontend"],
            content:
                "A deep dive into the utility-first approach of Tailwind CSS.",
        },
        {
            id: 3,
            title: "Data Management in Admin Dashboards",
            author: "John Smith",
            date: "2023-03-10",
            categories: ["Backend"],
            tags: ["data", "backend"],
            content:
                "Best practices for managing data and user content in an admin dashboard.",
        },
        {
            id: 4,
            title: "Optimizing Blog Performance",
            author: "Gourango",
            date: "2023-04-05",
            categories: ["Frontend"],
            tags: ["performance", "frontend"],
            content:
                "Tips and tricks to make your blogs load faster and more efficiently.",
        },
    ]);

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

    // Filtering logic
    const filteredBlogs = blogs.filter(
        (blog) =>
            (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedCategories.length === 0 ||
                blog.categories.some((c) => selectedCategories.includes(c))) &&
            (selectedTags.length === 0 ||
                blog.tags.some((t) => selectedTags.includes(t)))
    );

    const handleEdit = (blog) => onAddOrUpdateBlog(blog);
    const handleDelete = (id) => {
        onDeleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
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
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center"
                        onClick={() => onAddOrUpdateBlog(null)}
                    >
                        <Plus size={18} /> Create
                    </button>
                </div>
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">
                        No blog posts found matching your criteria.
                    </p>
                )}
            </div>
        </div>
    );
};
