import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { InputField } from "../common/InputField";
import { validatePostMetaData } from "./utils";
import { CONTENT_STATUSES_OPTIONS } from "../../config";
import Dropdown from "../common/Dropdown";

const defaultMetaData = {
    description: "",
    readTime: "",
    status: "",
};

const PostMetaDataModal = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    title = "Create Post",
}) => {
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

    const handleDropdownChange = ({ name, value }) => {
        setMetaData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear error if value entered
        if (value?.toString().trim() !== "") {
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
        onClose(metaData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={title}
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
            <Dropdown
                label="Status"
                name="status"
                options={CONTENT_STATUSES_OPTIONS}
                onChange={handleDropdownChange}
                selected={metaData.status}
                error={errors.status}
            />
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
