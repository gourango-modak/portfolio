import React from "react";
import { Code } from "lucide-react";
const Project = () => {
	const projectsData = [
		{
			title: "E-Commerce Platform",
			description:
				"A scalable e-commerce solution with a .NET Core backend, featuring payment gateway integration and inventory management.",
			icon: <Code />,
			tags: [".NET Core", "React", "SQL Server"],
		},
		{
			title: "Real-Time Analytics Dashboard",
			description:
				"A dashboard application for visualizing live data streams using SignalR and modern frontend frameworks.",
			icon: <Code />,
			tags: ["SignalR", "Angular", "Azure"],
		},
		{
			title: "Enterprise CRM System",
			description:
				"A custom CRM built to streamline customer interactions and sales pipelines for a large organization.",
			icon: <Code />,
			tags: ["ASP.NET MVC", "Entity Framework", "REST API"],
		},
	];

	return (
		<section id="projects" className="py-20 bg-white/50">
			<div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
				<h2 className="text-3xl font-bold text-center mb-2 text-slate-900">
					My Projects
				</h2>
				<p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
					Here are a few examples of my work, showcasing my skills in
					building robust and scalable applications.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projectsData.map((project, index) => (
						<div
							key={index}
							className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-400 hover:shadow-indigo-500/10 transition-all duration-300"
						>
							<div className="text-indigo-600 mb-4">
								{React.cloneElement(project.icon, { size: 32 })}
							</div>
							<h3 className="text-xl font-bold mb-2 text-slate-900">
								{project.title}
							</h3>
							<p className="text-slate-600 mb-4">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-2 mt-auto">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Project;
