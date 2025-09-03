import { CONTENT_TYPES } from "../config";
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

const getRequiredOptions = (contentType) => {
    // Default required options for all content type
    const requiredOptions = {
        requireTitle: true,
        requireTags: false,
        requireTagline: false,
    };

    switch (contentType) {
        case CONTENT_TYPES.BLOG:
            return requiredOptions;
        case CONTENT_TYPES.PROJECT:
            requiredOptions.requireTitle = true;
            requiredOptions.requireTagline = true;
            return requiredOptions;
        default:
            return requiredOptions;
    }
};

export const validateEditorJsModal = (contentType, editorData, showAlert) => {
    const { requireTitle, requireTags, requireTagline } =
        getRequiredOptions(contentType);

    const errors = [];

    // Check for title
    if (requireTitle) {
        if (!extractTitle(editorData))
            errors.push("Please add a title before saving.");
    }

    // Check for tags (useful for projects)
    if (requireTags) {
        const tags = extractTags(editorData);
        if (!tags || tags.length === 0)
            errors.push("Please add project tech stacks by tag list.");
    }

    // Check for tagline (useful for projects)
    if (requireTagline) {
        if (!extractTagline(editorData))
            errors.push("Please add project tagline.");
    }

    // Display all errors if showAlert is provided
    if (showAlert && errors.length > 0) {
        showAlert(errors.join("\n"));
    }

    return errors.length === 0; // valid if no errors
};
