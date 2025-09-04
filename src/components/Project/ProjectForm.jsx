import { useState } from "react";
import { InputField } from "../common/InputField";

export const ProjectForm = ({ initialData }) => {
    const [formData, setFormData] = useState({
        description: initialData?.description || "",
        liveUrl: initialData?.liveUrl || "",
        repoUrl: initialData?.repoUrl || "",
        startDate: initialData?.startDate || "",
        endDate: initialData?.endDate || "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear error if value entered
        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };
    return (
        
    );
};
