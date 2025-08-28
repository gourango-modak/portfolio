import BlogPostCard from "../components/Home/Blog/BlogPostCard";
import { Book, PlusCircle } from "lucide-react";
import { ISDEVENV } from "../config/config";
import { useState } from "react";
import BlogModal from "../components/Blog/BlogModal";

const Blog = () => {
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<section className="pt-24 pb-20 min-h-screen bg-gray-50">
				<div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
					<div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
						<h1 className="text-4xl font-bold text-slate-900">
							My Writings
						</h1>
						<div className={ISDEVENV ? "" : "hidden"}>
							<button
								onClick={() => setIsModalOpen(true)}
								className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 cursor-pointer"
							>
								<PlusCircle size={20} /> Add
							</button>
						</div>
					</div>
					<p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
						Here I share my thoughts on software development, .NET,
						and the tech world.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{blogData.map((post) => (
							<BlogPostCard key={post.id} post={post} />
						))}
					</div>
				</div>
			</section>
			<BlogModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};

export default Blog;
