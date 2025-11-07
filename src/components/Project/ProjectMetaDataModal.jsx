import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { InputField } from "../common/InputField";
import Dropdown from "../common/Dropdown";
import { validateProjectMetaData } from "./utils";
import { getCategoryOptions } from "../category/utils";
import {
    CONTENT_STATUSES_OPTIONS,
    mapContentStatusToOption,
} from "../../config";

const defaultMetaData = {
    description: "",
    liveUrl: "",
    repoUrl: "",
    startDate: "",
    endDate: "",
    status: "",
    category: "",
};

const ProjectMetaDataModal = ({
    isOpen,
    onClose,
    onSave,
    initialData = {},
    title = "Create New Project",
    categories = [],
}) => {
    const mapCategoryValueToOption = (categoryValue) => {
        return categories.find((opt) => opt.name === categoryValue) || "";
    };
    const safeInitial = initialData ?? {}; // fallback if null or undefined
    const [metaData, setMetaData] = useState({
        ...defaultMetaData,
        ...safeInitial,
        status: mapContentStatusToOption(safeInitial.status),
        category: mapCategoryValueToOption(safeInitial.category.name),
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setMetaData({
            ...defaultMetaData,
            ...initialData,
            status: mapContentStatusToOption(initialData.status),
            category: mapCategoryValueToOption(initialData.category.name),
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
        const validationErrors = validateProjectMetaData(metaData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSave(metaData);
        setMetaData(defaultMetaData);
        setErrors({});
    };

    const handleClose = () => {
        onClose(metaData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            style={{ width: "w-2xl" }}
            title={title}
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
                value={metaData?.description || ""}
                onChange={handleChange}
                required={true}
                error={errors.description}
                minRows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                    label="Start Date"
                    name="startDate"
                    value={metaData?.startDate || ""}
                    onChange={handleChange}
                    required={true}
                    error={errors.startDate}
                    maxRows={1}
                />

                <InputField
                    label="End Date"
                    name="endDate"
                    value={metaData?.endDate || ""}
                    onChange={handleChange}
                    required={true}
                    error={errors.endDate}
                    maxRows={1}
                />
            </div>
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
                label="Live Site URL"
                name="liveUrl"
                value={metaData?.liveUrl || ""}
                onChange={handleChange}
                required={true}
                error={errors.liveUrl}
            />

            <InputField
                label="Repository URL"
                name="repoUrl"
                value={metaData?.repoUrl || ""}
                onChange={handleChange}
                required={true}
                error={errors.repoUrl}
            />
        </Modal>
    );
};

export default ProjectMetaDataModal;
