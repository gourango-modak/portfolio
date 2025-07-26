import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPosts } from "../utils/postUtils";
import MarkdownRenderer from "../components/Blog/MarkdownRenderer";
import Loader from "../components/Page/Loader";

const BlogPostPage = () => {
	const { slug } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const foundPost = getAllPosts().find((p) => p.slug === slug);
		setPost(foundPost || null);
		setLoading(false);
	}, [slug]);

	if (loading) {
		return <Loader message="Loading..." />;
	}

	if (!post) {
		return <div>Post not found.</div>;
	}

	return (
		<div className="w-3xl mx-auto py-10 text-neutral-800 dark:text-white">
			<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
			<p className="text-sm text-neutral-500 mb-4">{post.date}</p>
			{/* Category */}
			{post.category && (
				<p className="text-sm text-neutral-500 mb-6">
					Category:{" "}
					<span className="font-medium text-neutral-700 dark:text-neutral-300">
						{post.category}
					</span>
				</p>
			)}
			<div className="prose dark:prose-invert max-w-none">
				<MarkdownRenderer content={post.content} />
			</div>
			{/* Tags */}
			{post.tags?.length > 0 && (
				<div className="mt-8 pt-4 flex flex-wrap gap-2">
					{[...new Set(post.tags)].map((tag) => (
						<span
							key={tag}
							className="text-sm px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300"
						>
							#{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default BlogPostPage;
