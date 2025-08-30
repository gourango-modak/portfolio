import { isValidUrl } from "./common";
import { extractTagline, extractTags, extractTitle } from "./editor";

export const validateProjectForm = (data) => {
    const errors = {};
    if (!data.description.trim())
        errors.description = "Short Description is required";

    // URL fields
    if (!data.liveUrl?.trim()) {
        errors.liveUrl = "Live URL is required";
    } else if (!isValidUrl(data.liveUrl)) {
        errors.liveUrl = "Live URL is invalid";
    }

    if (!data.repoUrl?.trim()) {
        errors.repoUrl = "Repository URL is required";
    } else if (!isValidUrl(data.repoUrl)) {
        errors.repoUrl = "Repository URL is invalid";
    }

    // Start date validation
    if (!data.startDate) {
        errors.startDate = "Start date is required";
    } else if (isNaN(new Date(data.startDate).getTime())) {
        errors.startDate = "Start date is invalid";
    }

    // End date validation
    if (!data.endDate) {
        errors.endDate = "End date is required";
    } else if (isNaN(new Date(data.endDate).getTime())) {
        errors.endDate = "End date is invalid";
    }

    // Check if start date is before end date
    if (data.startDate && data.endDate) {
        const start = new Date(data.startDate).getTime();
        const end = new Date(data.endDate).getTime();
        if (start > end) {
            errors.startDate = "Start date cannot be after end date";
            errors.endDate = "End date cannot be before start date";
        }
    }

    return errors;
};

export const validatePostForm = (data) => {
    const errors = {};
    if (!data.description.trim())
        errors.description = "Description is required";

    return errors;
};

export const validateEditorModal = (
    editorData,
    requireOptions = {},
    showAlert
) => {
    // Default validation requirements
    const defaultRequire = {
        requireTitle: true,
        requireTags: false,
        requireTagline: false,
    };

    // Merge defaults with caller-provided options
    const { requireTitle, requireTags, requireTagline } = {
        ...defaultRequire,
        ...requireOptions,
    };

    const errors = [];

    // Check for title
    if (requireTitle) {
        const { title } = extractTitle(editorData);
        if (!title) errors.push("Please add a title before saving.");
    }

    // Check for tags (useful for projects)
    if (requireTags) {
        const { tags } = extractTags(editorData);
        if (!tags || tags.length === 0)
            errors.push("Please add project tech stacks by tag list.");
    }

    // Check for tagline (useful for projects)
    if (requireTagline) {
        const { tagline } = extractTagline(editorData);
        if (!tagline || tagline.length === 0)
            errors.push("Please add project tagline.");
    }

    // Display all errors if showAlert is provided
    if (showAlert && errors.length > 0) {
        showAlert(errors.join("\n"));
    }

    return errors.length === 0; // valid if no errors
};

export const validateEditorModalForBlogPost = (editorData, showAlert) => {
    return validateEditorModal(editorData, {}, showAlert);
};

export const validateEditorModalForProject = (editorData, showAlert) => {
    return validateEditorModal(
        editorData,
        { requireTags: true, requireTagline: true },
        showAlert
    );
};
