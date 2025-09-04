import { InputField } from "../common/InputField";

export const ProjectForm = ({ formData, handleChange, errors = {} }) => {
    return (
        <>
            <InputField
                label="Short Description"
                name="description"
                value={formData?.description || ""}
                onChange={handleChange}
                required={true}
                error={errors.description}
                minRows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                    label="Start Date"
                    name="startDate"
                    value={formData?.startDate || ""}
                    onChange={handleChange}
                    required={true}
                    error={errors.startDate}
                    maxRows={1}
                />

                <InputField
                    label="End Date"
                    name="endDate"
                    value={formData?.endDate || ""}
                    onChange={handleChange}
                    required={true}
                    error={errors.endDate}
                    maxRows={1}
                />
            </div>
            <InputField
                label="Live Site URL"
                name="liveUrl"
                value={formData?.liveUrl || ""}
                onChange={handleChange}
                required={true}
                error={errors.liveUrl}
            />

            <InputField
                label="Repository URL"
                name="repoUrl"
                value={formData?.repoUrl || ""}
                onChange={handleChange}
                required={true}
                error={errors.repoUrl}
            />
        </>
    );
};
