import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { InputField } from "../common/InputField";
import { validatePostMetaData } from "./postUtils";

const defaultMetaData = {
    description: "",
    readTime: "",
};

const PostMetaDataModal = ({ isOpen, onClose, onSave, initialData }) => {
    const safeInitial = initialData ?? {}; // fallback if null or undefined
    const [metaData, setMetaData] = useState({
        ...defaultMetaData,
        ...safeInitial,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setMetaData({ ...defaultMetaData, ...initialData });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMetaData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear error if value entered
        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSave = () => {
        const validationErrors = validatePostMetaData(metaData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSave(metaData);
        setMetaData(defaultMetaData);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Create Post"
            style={{ width: "w-lg" }}
            footer={
                <>
                    <button
                        onClick={handleSave}
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
                value={metaData.description}
                onChange={handleChange}
                required={true}
                error={errors.description}
                minRows={3}
            />
            <InputField
                label="Read Time (minutes)"
                name="readTime"
                value={metaData?.readTime || ""}
                onChange={handleChange}
                required={true}
                error={errors.readTime}
                maxRows={1}
            />
        </Modal>
    );
};

export default PostMetaDataModal;
