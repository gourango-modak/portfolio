import React, { useState } from "react";
import { Edit, Trash, Plus, Filter, X } from "lucide-react";

// Reusable SearchBar
const SearchBar = ({ value, onChange, placeholder }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    />
);

// MultiSelect Dropdown Component
const MultiSelectDropdown = ({
    label,
    options,
    selectedOptions,
    setSelectedOptions,
}) => {
    const [open, setOpen] = useState(false);

    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((o) => o !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="relative w-full">
            <button
                type="button"
                className="w-full p-2 border border-gray-300 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setOpen(!open)}
            >
                <span>{label}</span>
                {open ? <X size={16} /> : <Filter size={16} />}
            </button>
            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {options.map((option, idx) => (
                        <label
                            key={idx}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selectedOptions.includes(option)}
                                onChange={() => toggleOption(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

// Blog Card
const BlogCard = ({ blog, onEdit, onDelete }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
            <div className="flex space-x-2">
                <button
                    onClick={() => onEdit(blog)}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    <Edit size={20} />
                </button>
                <button
                    onClick={() => onDelete(blog.id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <Trash size={20} />
                </button>
            </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">
            By {blog.author} on {blog.date}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, idx) => (
                <span
                    key={idx}
                    className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                >
                    {tag}
                </span>
            ))}
        </div>
        <p className="text-gray-600">{blog.content.substring(0, 150)}...</p>
    </div>
);

// Blogs Panel
const BlogsPanel = ({ onAddOrUpdateBlog, onDeleteBlog }) => {
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
            {/* Search + Add Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title or author..."
                />
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center w-full sm:w-auto"
                    onClick={() => onAddOrUpdateBlog(null)}
                >
                    <Plus size={18} /> Add New Blog
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
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
            </div>

            {/* Blog Cards */}
            <div className="space-y-6">
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

export default BlogsPanel;
