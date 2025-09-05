import { useEffect, useState } from "react";
import { validateProjectForm } from "../../utils/validation";
import Modal from "../Modal/Modal";
import { InputField } from "./../Common/InputField";
import Dropdown from "../Common/Dropdown";
import {
    PROJECT_CATEGORIES_OPTIONS,
    PROJECT_STATUSES_OPTIONS,
} from "../../config/config";

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
    onBack,
    initialData = {},
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

    const handleBack = () => {
        setMetaData(defaultMetaData);
        onBack(metaData);
    };

    const handleSave = () => {
        const validationErrors = validateProjectForm(metaData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSave(metaData);
        setMetaData(defaultMetaData);
    };

    const handleClose = () => {
        onClose();
        setMetaData(defaultMetaData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            style={{ width: "w-2xl" }}
            title={"Create New Project"}
            footer={
                <>
                    <button
                        onClick={handleBack}
                        className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300"
                    >
                        Back
                    </button>
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
                    options={PROJECT_STATUSES_OPTIONS}
                    onChange={handleDropdownChange}
                    selected={metaData.status}
                />
                <Dropdown
                    label="Category"
                    name="category"
                    options={PROJECT_CATEGORIES_OPTIONS}
                    onChange={handleDropdownChange}
                    selected={metaData.category}
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
