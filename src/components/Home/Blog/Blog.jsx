import { Book } from "lucide-react";
import BlogPostCard from "./BlogPostCard";
import { Link } from "react-router-dom";

const Blog = () => {
	// NOTE: For better organization, this data should live in a separate file (e.g., in a /data or /constants folder)
	const blogData = [
		{
			id: 1, // Added an ID for unique routing
			title: "Mastering Asynchronous Programming in C#",
			excerpt:
				"A deep dive into async/await patterns and best practices for building responsive .NET applications.",
			icon: <Book />,
			date: "July 15, 2024",
		},
		{
			id: 2, // Added an ID for unique routing
			title: "Building Microservices with .NET and Docker",
			excerpt:
				"An introductory guide to designing, building, and deploying containerized microservices.",
			icon: <Book />,
			date: "June 28, 2024",
		},
		{
			id: 3, // Added an ID for unique routing
			title: "Optimizing SQL Server Performance for Developers",
			excerpt:
				"Practical tips and tricks for writing efficient queries and improving database performance.",
			icon: <Book />,
			date: "May 10, 2024",
		},
	];

	return (
		<section id="blog" className="py-20 bg-white/50">
			<div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
				<h2 className="text-3xl font-bold text-center mb-2 text-slate-900">
					From My Blog
				</h2>
				<p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
					I write about technology, development, and everything in
					between. Here are some of my latest articles.
				</p>
				<div className="space-y-8">
					{blogData.map((post) => (
						<BlogPostCard key={post.id} post={post} />
					))}
				</div>
			</div>
			<div className="mt-12 text-center">
				<Link
					to="/blog"
					className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
				>
					Read All Posts
				</Link>
			</div>
		</section>
	);
};

export default Blog;
