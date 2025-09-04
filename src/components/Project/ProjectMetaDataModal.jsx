import { useEffect, useState } from "react";
import { validateProjectForm } from "../../utils/validation";
import Modal from "../Modal/Modal";
import { InputField } from "./../Common/InputField";

const defaultMetaData = {
    description: "",
    liveUrl: "",
    repoUrl: "",
    startDate: "",
    endDate: "",
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

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
