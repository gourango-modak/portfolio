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

    const addSection = (section) => {
        setFormData((prev) => ({
            ...prev,
            sections: [...prev.sections, section],
        }));
    };

    const removeSection = (index) => {
        setFormData((prev) => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index),
        }));
    };

    const handleSectionChange = (index, e) => {
        const { name, value } = e.target;
        const newSections = [...formData.sections];
        newSections[index][name] = value;
        setFormData((prev) => ({ ...prev, sections: newSections }));
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleChange,
        handleSectionChange,
        addSection,
        removeSection,
    };
};
