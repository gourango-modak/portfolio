import { InputField } from "../common/InputField";
import { TextAreaField } from "../common/TextareaField";
import { ProjectSections } from "./ProjectSections";
import { PlusCircle } from "lucide-react";

export const ProjectForm = ({
    formData,
    handleChange,
    handleSectionChange,
    removeSection,
    openAddSectionModal,
    errors = {},
}) => {
    return (
        <>
            <InputField
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required={true}
                error={errors.title}
            />

            <TextAreaField
                label="Short Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required={true}
                error={errors.description}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                    label="Start Date (e.g., Jan 2024)"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required={true}
                    error={errors.startDate}
                />

                <InputField
                    label="End Date (e.g., May 2024)"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required={true}
                    error={errors.endDate}
                />
            </div>

            <TextAreaField
                label="Key Features (comma-separated)"
                name="keyFeatures"
                value={formData.features}
                onChange={handleChange}
                required={true}
                error={errors.keyFeatures}
            />

            <InputField
                label="Tech Stack (comma-separated)"
                name="technologies"
                value={formData.tags}
                onChange={handleChange}
                required={true}
                error={errors.technologies}
            />

            <InputField
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required={true}
                error={errors.image}
            />

            <InputField
                label="Live Site URL"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                required={true}
                error={errors.liveUrl}
            />

            <InputField
                label="Repository URL"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
                required={true}
                error={errors.repoUrl}
            />

            <ProjectSections
                sections={formData.sections}
                onChange={handleSectionChange}
                onRemove={removeSection}
            />

            <button
                onClick={openAddSectionModal}
                className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
                <PlusCircle size={20} /> Add New Section
            </button>
        </>
    );
};
