import { Book, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";
import { truncateText } from "../../utils/common";
import { CARD_DESCRIPTION_MAX_LENGTH } from "../../config/config";
import { useAuth } from "../../context/AuthContext";

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
                            ? `Updated on ${formatDate(post.updatedAt)}`
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
                </div>
            </Link>

            {isAuthenticated && (
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
