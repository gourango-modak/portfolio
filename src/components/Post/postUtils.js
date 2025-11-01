import { buildSlug, generateId } from "../../utils/common";
import { extractTags, extractTitle } from "../editorJs/editorJsUtils";

export const preparePostData = (editorJsData, metaData) => {
    const tags = extractTags(editorJsData);
    const title = extractTitle(editorJsData);
    const isEditing = Boolean(metaData?.id);
    const id = isEditing ? metaData.id : generateId();

    return {
        ...metaData,
        id: id,
        createdAt: isEditing ? metaData.createdAt : Date.now(),
        updatedAt: Date.now(),
        readTime: parseInt(metaData.readTime),
        title: title,
        tags: tags,
        slug: buildSlug(title, id),
        status: metaData.status.value,
        content: editorJsData,
    };
};

export const validatePostMetaData = (data) => {
    const errors = {};
    if (!data.description.trim())
        errors.description = "Description is required";

    // Read Time validation
    if (!data.readTime) {
        errors.readTime = "Read Time is required";
    } else if (
        !Number.isInteger(Number(data.readTime)) ||
        Number(data.readTime) <= 0
    ) {
        errors.readTime = "Read Time must be a positive integer";
    }

    return errors;
};
