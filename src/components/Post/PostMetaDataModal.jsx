import { useEffect, useState } from "react";
import { validatePostForm } from "../../utils/validation";
import Modal from "../Modal/Modal";
import { InputField } from "../Common/InputField";

const defaultMetaData = {
    description: "",
};

const PostMetaDataModal = ({
    isOpen,
    onClose,
    onSave,
    onBack,
    initialData,
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
        const validationErrors = validatePostForm(metaData);
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
            title="Create Post"
            style={{ width: "w-lg" }}
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
                value={metaData.description}
                onChange={handleChange}
                required={true}
                error={errors.description}
                minRows={3}
            />
        </Modal>
    );
};

export default PostMetaDataModal;
