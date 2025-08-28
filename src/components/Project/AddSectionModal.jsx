import { useState } from "react";
import { InputField } from "../Common/InputField";
import Modal from "../Common/Modal";

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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Add New Section Title"
			position="center"
			width="w-sm"
			footer={
				<>
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
				</>
			}
		>
			<InputField
				label="Section Title"
				name="sectionTitle"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
		</Modal>
	);
};
