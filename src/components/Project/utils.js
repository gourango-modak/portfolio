import { buildSlug, generateId, isValidUrl } from "../../utils/common";
import {
    extractTagline,
    extractTags,
    extractTitle,
    updateImageUrls,
} from "../editorJs/utils";

export const prepareProjectData = (editorJsData, metaData) => {
    const tags = extractTags(editorJsData);
    const title = extractTitle(editorJsData);
    const tagline = extractTagline(editorJsData);
    const isEditing = Boolean(metaData?.id);
    const id = isEditing ? metaData.id : generateId();
    updateImageUrls(editorJsData);

    return {
        ...metaData,
        id: id,
        createdAt: isEditing ? metaData.createdAt : Date.now(),
        updatedAt: Date.now(),
        title: title,
        tagline: tagline,
        tags: tags,
        slug: buildSlug(title, id),
        status: metaData.status.value,
        category: metaData.category.label,
        content: editorJsData,
    };
};

export const validateProjectMetaData = (data) => {
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

    // Status validation
    if (!data.status.value) {
        errors.status = "Status is required";
    }

    // Category validation
    if (!data.category.value) {
        errors.category = "Category is required";
    }

    return errors;
};
