import { BREADCRUMB_MAX_LENGTH } from "../config";
import { extractTagline, extractTags, extractTitle } from "./editor";

export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

export const downloadJson = (data, fileName) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const truncateText = (text, maxLength = 0, suffix = "") => {
    if (typeof text !== "string") return "";
    const limit = maxLength === 0 ? text.length : maxLength;
    return text.length > limit ? text.slice(0, limit) + suffix : text;
};

export const truncateBreadcrumb = (text, maxLength = BREADCRUMB_MAX_LENGTH) => {
    return truncateText(text, maxLength, "...");
};

export const getFileName = (title, id) => {
    // Convert to lowercase
    let name = title.toLowerCase();

    // Replace all non-alphanumeric characters (except dash) with a dash
    name = name.replace(/[^a-z0-9]+/g, "");

    // Remove leading/trailing dashes
    name = name.replace(/^-+|-+$/g, "");

    return `${id}_${name}.json`;
};

export const prepareProjectData = (editorData, metaData) => {
    const { tags: extractedTags, content: contentWithoutTags } =
        extractTags(editorData);
    const { title: extractedTitle, content: contentWithoutTitle } =
        extractTitle(contentWithoutTags);
    const { tagline: extractedTagline, content: contentWithoutTagline } =
        extractTagline(contentWithoutTitle);

    return {
        id: generateId(),
        title: extractedTitle,
        tagline: extractedTagline,
        createdAt: Date.now(),
        ...metaData,
        technologies: extractedTags,
        slug: buildSlug(extractedTitle),
        content: contentWithoutTagline,
    };
};

export const preparePostData = (editorData, metaData) => {
    const { title: extractedTitle, content: contentWithoutTitle } =
        extractTitle(editorData);
    const { tags: extractedTags, content: contentWithoutTags } =
        extractTags(contentWithoutTitle);

    return {
        id: generateId(),
        title: extractedTitle,
        createdAt: Date.now(),
        tags: extractedTags,
        ...metaData,
        slug: buildSlug(extractedTitle),
        content: contentWithoutTags,
    };
};

export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const buildSlug = (title, id = "", maxLength = 100) => {
    if (!title) return id || "";

    // Convert to lowercase
    let slug = title.toLowerCase();

    // Remove accents
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Replace spaces/underscores with hyphens
    slug = slug.replace(/[\s_]+/g, "-");

    // Remove non-alphanumeric characters except hyphens
    slug = slug.replace(/[^a-z0-9-]/g, "");

    // Remove consecutive hyphens
    slug = slug.replace(/-+/g, "-");

    // Trim hyphens from start and end
    slug = slug.replace(/^-+|-+$/g, "");

    if (id) {
        // Ensure total length doesn't exceed maxLength
        const availableLength = maxLength - id.length - 1; // for hyphen
        if (slug.length > availableLength) {
            slug = slug.substring(0, availableLength).replace(/-+$/g, "");
        }
        slug = `${slug}-${id}`;
    }

    return slug;
};
