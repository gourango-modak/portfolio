import { useState } from "react";
import { InputField } from "../Common/InputField";

export const AddSectionModal = ({ isOpen, onClose, onAdd }) => {
	if (!isOpen) return null;
	const [title, setTitle] = useState("");

	const handleAdd = () => {
		if (title.trim()) {
			onAdd(title.trim());
			setTitle("");
		}
	};

	return (
		<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-2xl w-full max-w-sm">
				<div className="p-6">
					<h2 className="text-xl font-bold text-slate-800 mb-4">
						Add New Section Title
					</h2>
					<InputField
						label="Section Title"
						name="sectionTitle"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="p-4 flex justify-end gap-4 rounded-b-lg">
					<button
						onClick={onClose}
						className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						onClick={handleAdd}
						className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700"
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};
