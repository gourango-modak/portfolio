import { ExternalLink, Github, Calendar } from "lucide-react";

export const ProjectDetail = ({ project }) => {
	return (
		<>
			<h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
				{project.title}
			</h1>
			<p className=" text-slate-600 my-4">{project.description}</p>
			{project.startDate && project.endDate && (
				<div className="flex items-center gap-2 text-slate-500 my-4">
					<Calendar size={16} />
					<span>
						{project.startDate} - {project.endDate}
					</span>
				</div>
			)}
			<div className="my-12">
				<img
					src={project.image}
					alt={project.title}
					className="rounded-xl shadow-2xl w-full"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
				<div className="lg:col-span-2 text-slate-700 space-y-6">
					<div>
						<h2 className="text-2xl font-bold text-slate-800 mb-3">
							The Problem
						</h2>
						<p>{project.problem}</p>
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-800 mb-3">
							The Solution
						</h2>
						<p>{project.solution}</p>
					</div>
					{project.dynamicSections &&
						project.dynamicSections.map((section, index) => (
							<div key={index}>
								<h2 className="text-2xl font-bold text-slate-800 mb-3">
									{section.title}
								</h2>
								<p>{section.content}</p>
							</div>
						))}
				</div>
				<div className="space-y-6">
					<div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200">
						<h3 className="text-xl font-bold text-slate-800 mb-4">
							Tech Stack
						</h3>
						<div className="flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
					<div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200">
						<h3 className="text-xl font-bold text-slate-800 mb-4">
							Key Features
						</h3>
						<ul className="list-disc list-inside space-y-2 text-slate-700">
							{project.features.map((feature) => (
								<li key={feature}>{feature}</li>
							))}
						</ul>
					</div>
					<div className="flex flex-col space-y-4">
						<a
							href={project.liveUrl}
							className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
						>
							View Live Site <ExternalLink size={20} />
						</a>
						<a
							href={project.repoUrl}
							className="bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
						>
							View Code <Github size={20} />
						</a>
					</div>
				</div>
			</div>
		</>
	);
};
