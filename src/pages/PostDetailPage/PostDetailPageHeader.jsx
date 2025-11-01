import { formatDate } from "../../utils/date";

const PostDetailPageHeader = ({ post }) => {
    return (
        <header>
            <h1 className="title font-extrabold text-slate-900 leading-tight mb-4">
                {post.title}
            </h1>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-y-3 gap-x-6 text-gray-600 pb-6 border-b border-gray-200">
                {/* Author */}
                <span className="flex items-center gap-2">
                    <span className="text-gray-400">✍️</span>
                    Author:{" "}
                    <span className="text-slate-700 font-medium">
                        Gourango Modak
                    </span>
                </span>
                {/* Created / Published Date */}
                {post.createdAt && (
                    <span className="flex items-center gap-2">
                        <span className="text-gray-400">📅</span>
                        Published:{" "}
                        <span className="text-slate-700 font-medium">
                            {formatDate(post.createdAt)}
                        </span>
                    </span>
                )}
                {/* Read Time */}
                {post.readTime && (
                    <span className="flex items-center gap-2">
                        <span className="text-gray-400">⌛</span>
                        Read Time:{" "}
                        <span className="text-slate-700 font-medium">
                            {post.readTime} min
                        </span>
                    </span>
                )}
            </div>
        </header>
    );
};

export default PostDetailPageHeader;
