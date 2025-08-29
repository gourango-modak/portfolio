export const validateProjectForm = (data) => {
    const errors = {};
    if (!data.title.trim()) errors.title = "Title is required";
    if (!data.tagline.trim()) errors.tagline = "Tagline is required";
    if (!data.keyFeatures.trim())
        errors.keyFeatures = "Key features are required";
    if (!data.technologies.trim())
        errors.technologies = "Technologies are required";
    if (!data.image.trim()) errors.image = "Image URL is required";
    if (!data.liveUrl.trim()) errors.liveUrl = "Live URL is required";
    if (!data.repoUrl.trim()) errors.repoUrl = "Repository URL is required";
    if (!data.startDate) errors.startDate = "Start date is required";
    if (!data.endDate) errors.endDate = "End date is required";

    return errors;
};

export const validatePostForm = (data) => {
    const errors = {};
    if (!data.title.trim()) errors.title = "Title is required";
    if (!data.description.trim())
        errors.description = "Description is required";

    return errors;
};
