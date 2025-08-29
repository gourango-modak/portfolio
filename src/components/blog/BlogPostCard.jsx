import { Book } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";
import { truncateText } from "../../utils/string";

const BlogPostCard = ({ post }) => {
    return (
        <Link
            to={`/blog/${post.id}`}
            className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-400 hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6"
        >
            <div className="text-indigo-600 mt-1 flex-shrink-0">
                <Book />
            </div>
            <div>
                <p className="text-sm text-slate-500 mb-1">
                    {formatDate(post.createdAt)}
                </p>
                <h3 className="text-xl font-bold mb-2 text-slate-900">
                    {post.title}
                </h3>
                <p className="text-slate-600">
                    {truncateText(post.description)}
                </p>
            </div>
        </Link>
    );
};

export default BlogPostCard;
