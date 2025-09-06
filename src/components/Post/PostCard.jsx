import { Book, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";
import { useAuth } from "../../context/AuthContext";
import { truncateText } from "../../utils/common";
import { CARD_DESCRIPTION_MAX_LENGTH } from "../../config";

const PostCard = ({ post, onEdit }) => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-400 hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 relative">
            <Link to={`/blog/${post.slug}`} className="flex flex-1 gap-6">
                <div className="text-indigo-600 mt-1 flex-shrink-0">
                    <Book />
                </div>

                <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-1">
                        {post.updatedAt
                            ? `Last Updated on ${formatDate(post.updatedAt)}`
                            : `Published on ${formatDate(post.createdAt)}`}
                    </p>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">
                        {post.title}
                    </h3>
                    <p className="text-slate-600">
                        {truncateText(
                            post.description,
                            CARD_DESCRIPTION_MAX_LENGTH,
                            "..."
                        )}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags?.length > 0 &&
                            post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>
                </div>
            </Link>

            {isAuthenticated && onEdit && (
                <button
                    onClick={() => onEdit(post)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
                    title="Edit Post"
                >
                    <Edit3 size={16} className="text-gray-600" />
                </button>
            )}
        </div>
    );
};

export default PostCard;
