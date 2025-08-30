import { useState } from "react";

export const useProjectForm = (initialData) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // clear error if value entered
        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleChange,
    };
};
