import { useEffect, useState } from "react";
import { validatePostForm } from "./../../utils/validation";
import Modal from "./../Modal/index";
import { InputField } from "./../Common/InputField";
import { downloadJson, getFileName, preparePostData } from "../../utils/common";

const PostMetaDataModal = ({ isOpen, onClose, onSave, postData }) => {
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            if (postData?.description) {
                setDescription(postData?.description);
            }
            setErrors({});
        }
    }, [isOpen, postData]);

    const handleSaveClick = () => {
        const validationErrors = validatePostForm({ description });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const post = preparePostData(postData, { description });
        downloadJson(post, getFileName(post.title, post.id));
        onSave();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDescription(value);

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
            style={{ width: "w-lg" }}
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
                label="Short Description"
                name="description"
                value={description}
                onChange={handleChange}
                required={true}
                error={errors.description}
                minRows={3}
            />
        </Modal>
    );
};

export default PostMetaDataModal;
