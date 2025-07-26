import { Link } from "react-router-dom";

export const BlogCard = ({ post }) => (
	<div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-5 hover:shadow-md transition duration-200 bg-white dark:bg-neutral-900">
		<h2 className="text-xl font-semibold mb-1 text-neutral-900 dark:text-white">
			{post.title}
		</h2>
		<p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
			{new Date(post.date).toLocaleDateString()} • {post.category}
		</p>
		<p className="text-base text-neutral-700 dark:text-neutral-300 line-clamp-3 mb-4">
			{post.summary || post.content.slice(0, 200) + "..."}
		</p>
		<Link
			to={`/blog/${post.slug}`}
			className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
		>
			Read More →
		</Link>
	</div>
);
