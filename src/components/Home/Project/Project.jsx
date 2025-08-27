import { Code } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
const Project = () => {
	const projectsData = [
		{
			title: "E-Commerce Platform",
			description:
				"A scalable e-commerce solution with a .NET Core backend, featuring payment gateway integration and inventory management.",
			icon: <Code />,
			tags: [".NET Core", "React", "SQL Server"],
			id: 1,
		},
		{
			title: "Real-Time Analytics Dashboard",
			description:
				"A dashboard application for visualizing live data streams using SignalR and modern frontend frameworks.",
			icon: <Code />,
			tags: ["SignalR", "Angular", "Azure"],
			id: 2,
		},
		{
			title: "Enterprise CRM System",
			description:
				"A custom CRM built to streamline customer interactions and sales pipelines for a large organization.",
			icon: <Code />,
			tags: ["ASP.NET MVC", "Entity Framework", "REST API"],
			id: 3,
		},
	];

	return (
		<section className="py-20 bg-white/50">
			<div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
				<h2 className="text-3xl font-bold text-center mb-2 text-slate-900">
					My Projects
				</h2>
				<p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
					Here are a few examples of my work, showcasing my skills in
					building robust and scalable applications.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projectsData.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</div>
			<div className="mt-12 text-center">
				<Link
					to="/projects"
					className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
				>
					View All Projects
				</Link>
			</div>
		</section>
	);
};

export default Project;
