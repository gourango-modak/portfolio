import { useState } from "react";
import { InputField } from "../Common/InputField";
import { TextareaField } from "../Common/TextareaField";
import { X, PlusCircle, Trash2 } from "lucide-react";
import { AddSectionModal } from "./AddSectionModal";

const ProjectModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		problem: "",
		solution: "",
		features: "",
		tags: "",
		image: "",
		liveUrl: "",
		repoUrl: "",
		dynamicSections: [],
	});
	const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleDynamicChange = (index, e) => {
		const { name, value } = e.target;
		const newSections = [...formData.dynamicSections];
		newSections[index][name] = value;
		setFormData((prev) => ({
			...prev,
			dynamicSections: newSections,
		}));
	};

	const handleAddNewSection = (title) => {
		setFormData((prev) => ({
			...prev,
			dynamicSections: [
				...prev.dynamicSections,
				{ title: title, content: "" },
			],
		}));
		setIsAddSectionModalOpen(false);
	};

	const removeSection = (index) => {
		const newSections = formData.dynamicSections.filter(
			(_, i) => i !== index
		);
		setFormData((prev) => ({
			...prev,
			dynamicSections: newSections,
		}));
	};

	const handleSave = () => {
		const newProject = {
			id: Date.now(),
			...formData,
			tags: formData.tags.split(",").map((tag) => tag.trim()),
			features: formData.features
				.split(",")
				.map((feature) => feature.trim()),
		};
		const jsonString = JSON.stringify(newProject, null, 2);
		const blob = new Blob([jsonString], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${newProject.title
			.toLowerCase()
			.replace(/\s+/g, "-")}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/60 z-50 p-4 overflow-auto hide-scrollbar">
			<div className="flex items-center justify-center">
				<div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8">
					<div className="p-6 border-b border-gray-200 flex justify-between items-center">
						<h2 className="text-2xl font-bold text-slate-800">
							Create New Project
						</h2>
						<button
							onClick={onClose}
							className="text-slate-400 hover:text-slate-600 cursor-pointer"
						>
							<X size={24} />
						</button>
					</div>
					<div className="p-6 space-y-4">
						<InputField
							label="Project Title"
							name="title"
							value={formData.title}
							onChange={handleChange}
						/>
						<TextareaField
							label="Short Description"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<InputField
								label="Start Date (e.g., Jan 2024)"
								name="startDate"
								value={formData.startDate}
								onChange={handleChange}
							/>
							<InputField
								label="End Date (e.g., May 2024)"
								name="endDate"
								value={formData.endDate}
								onChange={handleChange}
							/>
						</div>
						<TextareaField
							label="The Problem"
							name="problem"
							value={formData.problem}
							onChange={handleChange}
						/>
						<TextareaField
							label="The Solution"
							name="solution"
							value={formData.solution}
							onChange={handleChange}
						/>
						<TextareaField
							label="Key Features (comma-separated)"
							name="features"
							value={formData.features}
							onChange={handleChange}
						/>
						<InputField
							label="Tech Stack (comma-separated)"
							name="tags"
							value={formData.tags}
							onChange={handleChange}
						/>
						<InputField
							label="Image URL"
							name="image"
							value={formData.image}
							onChange={handleChange}
						/>
						<InputField
							label="Live Site URL"
							name="liveUrl"
							value={formData.liveUrl}
							onChange={handleChange}
						/>
						<InputField
							label="Repository URL"
							name="repoUrl"
							value={formData.repoUrl}
							onChange={handleChange}
						/>
						{formData.dynamicSections.map((section, index) => (
							<div key={index} className="relative">
								<button
									onClick={() => removeSection(index)}
									className="absolute right-0 text-red-400 hover:text-red-600 cursor-pointer"
								>
									<Trash2 size={18} />
								</button>
								<TextareaField
									label={section.title}
									name="content"
									value={section.content}
									onChange={(e) =>
										handleDynamicChange(index, e)
									}
								/>
							</div>
						))}
					</div>
					<div className="px-6 mb-6 flex flex-row items-center">
						<button
							onClick={() => setIsAddSectionModalOpen(true)}
							className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 inline-flex items-center justify-center gap-2 cursor-pointer"
						>
							<PlusCircle size={20} /> Add New Section
						</button>
					</div>
					<div className="p-6 border-t border-gray-200 flex justify-end gap-4 rounded-b-lg">
						<button
							onClick={onClose}
							className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700"
						>
							Save & Download JSON
						</button>
					</div>
				</div>
			</div>
			<AddSectionModal
				isOpen={isAddSectionModalOpen}
				onClose={() => setIsAddSectionModalOpen(false)}
				onAdd={handleAddNewSection}
			/>
		</div>
	);
};

export default ProjectModal;
