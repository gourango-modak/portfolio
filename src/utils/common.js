import { BREADCRUMB_MAX_LENGTH } from "../config";

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

export const getContentFileName = (title, id) => {
    // Convert to lowercase
    let name = title.toLowerCase();

    // Replace all non-alphanumeric characters (except dash) with a dash
    name = name.replace(/[^a-z0-9]+/g, "");

    // Remove leading/trailing dashes
    name = name.replace(/^-+|-+$/g, "");

    return `${id}_${name}.json`;
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

export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};
