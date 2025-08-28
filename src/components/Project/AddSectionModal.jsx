import { useState } from "react";
import { InputField } from "../common/InputField";
import Modal from "../common/Modal";
import { CONFIG } from "../../config/config";

export const AddSectionModal = ({ isOpen, onClose, onAdd }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState("");
    const [sectionType, setSectionType] = useState(CONFIG.SECTION_TYPE.INPUT);

    const handleAdd = () => {
        if (!title.trim()) return;
        onAdd({ title: title.trim(), type: sectionType });
        setTitle("");
        setSectionType("text");
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
            <div className="mt-4">
                <label className="block mb-1 font-semibold text-gray-700">
                    Section Type
                </label>
                <select
                    value={sectionType}
                    onChange={(e) => setSectionType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none"
                >
                    <option value={CONFIG.SECTION_TYPE.INPUT}>Input</option>
                    <option value={CONFIG.SECTION_TYPE.TEXT}>Text</option>
                </select>
            </div>
        </Modal>
    );
};
