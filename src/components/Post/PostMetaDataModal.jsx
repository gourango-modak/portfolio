import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { InputField } from "../common/InputField";
import { validatePostMetaData } from "./utils";
import {
    CONTENT_STATUSES_OPTIONS,
    mapContentStatusToOption,
} from "../../config";
import Dropdown from "../common/Dropdown";
import { getCategoryOptions, mapCategoryToOption } from "../category/utils";

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
    categories = [],
}) => {
    const safeInitial = initialData ?? {}; // fallback if null or undefined
    const [metaData, setMetaData] = useState({
        ...defaultMetaData,
        ...safeInitial,
        status: mapContentStatusToOption(safeInitial.status),
        category: mapCategoryToOption(safeInitial.category),
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setMetaData({
            ...defaultMetaData,
            ...initialData,
            status: mapContentStatusToOption(safeInitial.status),
            category: mapCategoryToOption(safeInitial.category),
        });
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Dropdown
                    label="Status"
                    name="status"
                    options={CONTENT_STATUSES_OPTIONS}
                    onChange={handleDropdownChange}
                    selected={metaData.status}
                    error={errors.status}
                />
                <Dropdown
                    label="Category"
                    name="category"
                    options={getCategoryOptions(categories)}
                    onChange={handleDropdownChange}
                    selected={metaData.category}
                    error={errors.category}
                />
            </div>
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
