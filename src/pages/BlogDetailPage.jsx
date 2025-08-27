import { useParams } from "react-router-dom";
import { Book } from "lucide-react";
import { Breadcrumb } from "../components/Common/Breadcrumb";

const BlogDetailPage = () => {
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
	const { id } = useParams();
	const post = blogData.find((p) => p.id === parseInt(id));
	if (!post)
		return (
			<div className="pt-24 min-h-screen container mx-auto px-6 md:px-12 md:max-w-6xl">
				Blog post not found.
			</div>
		);

	const crumbs = [
		{ to: "/", label: "Home" },
		{ to: "/Blog", label: "Blog" },
		{ label: post.title.slice(0, 30) + "..." },
	];

	return (
		<div className="pt-24 min-h-screen container mx-auto px-6 md:px-12 md:max-w-6xl">
			<div className="mb-8">
				<Breadcrumb crumbs={crumbs} />
			</div>
			<p className="text-slate-500 mb-2">{post.date}</p>
			<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
			<p>{post.excerpt}</p>
		</div>
	);
};

export default BlogDetailPage;
