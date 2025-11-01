import Modal from "../modal/Modal";
import { useEffect, useState } from "react";
import { validateCategoryMetaData } from "./utils";
import { InputField } from "../common/InputField";

const defaultMetaData = {
    name: "",
};

export const CategoryModal = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    title = "Create Category",
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

    const handleSave = () => {
        const validationErrors = validateCategoryMetaData(metaData);
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
            <InputField
                label="Name"
                name="name"
                value={metaData.name}
                onChange={handleChange}
                required={true}
                error={errors.name}
                minRows={1}
            />
        </Modal>
    );
};
