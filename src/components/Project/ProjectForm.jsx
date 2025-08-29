import { InputField } from "../common/InputField";

export const ProjectForm = ({ formData, handleChange, errors = {} }) => {
    return (
        <>
            <InputField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required={true}
                error={errors.title}
            />

            <InputField
                label="Tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                required={true}
                error={errors.tagline}
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
            <InputField
                label="Technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required={true}
                error={errors.technologies}
                minRows={2}
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
        </>
    );
};
