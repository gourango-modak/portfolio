import { extractTitle } from "./editor";

export const validateProjectForm = (data) => {
    const errors = {};
    if (!data.tagline.trim()) errors.tagline = "Tagline is required";
    if (!data.description.trim()) errors.tagline = "Tagline is required";
    if (!data.liveUrl.trim()) errors.liveUrl = "Live URL is required";
    if (!data.repoUrl.trim()) errors.repoUrl = "Repository URL is required";
    if (!data.startDate) errors.startDate = "Start date is required";
    if (!data.endDate) errors.endDate = "End date is required";

    return errors;
};

export const validatePostForm = (data) => {
    const errors = {};
    if (!data.description.trim())
        errors.description = "Description is required";

    return errors;
};

export const validateEditorModalForBlogPost = (editorData, showAlert) => {
    const { title } = extractTitle(editorData);
    if (!title) {
        showAlert("Please add a title before saving.");
        return;
    }
};

export const validateEditorModalForProject = (editorData, showAlert) => {
    const { title } = extractTitle(editorData);
    if (!title) {
        showAlert("Please add a title before saving.");
        return;
    }
};
