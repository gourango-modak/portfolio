import { useState } from "react";
import Modal from "../common/Modal";
import { validatePostForm } from "../../utils/validateForms";
import { downloadJson } from "../../utils/downloadJson";

const initialData = {
    title: "",
    description: "",
};

const BlogPostSaveModal = ({ isOpen, onClose, post }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState("");

    const handleSaveClick = () => {
        const validationErrors = validatePostForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        post.title = formData.title;
        post.description = formData.description;
        downloadJson(
            post,
            `${
                post.id + "_" + post.title.toLowerCase().replace(/\s+/g, "-")
            }.json`
        );
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // clear error if value entered
        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Post"
            width="w-2xl"
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveClick}
                        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-700"
                    >
                        Download JSON
                    </button>
                </>
            }
        >
            <InputField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required={true}
                error={errors.title}
                rows="1"
            />

            <InputField
                label="Short Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required={true}
                error={errors.description}
            />
        </Modal>
    );
};

export default BlogPostSaveModal;
