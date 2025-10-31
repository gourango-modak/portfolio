import { Edit, Trash } from "lucide-react";

export const BlogCard = ({ blog, onEdit, onDelete }) => (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between">
        <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-xl font-extrabold text-gray-900 truncate mb-1">
                {blog.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
                By{" "}
                <span className="font-semibold text-gray-600">
                    {blog.author}
                </span>{" "}
                on {blog.date}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
                {blog.tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-gray-600 line-clamp-2 leading-relaxed">
                {blog.content.substring(0, 150)}...
            </p>
        </div>

        <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3 mt-4 md:mt-0 md:ml-4 items-end">
            <button
                onClick={() => onEdit(blog)}
                title="Edit Blog"
                className="text-indigo-600 hover:text-white hover:bg-indigo-600 p-2 rounded-full transition duration-200 border border-indigo-600 hover:shadow-lg cursor-pointer"
            >
                <Edit size={20} />
            </button>
        </div>
    </div>
);
