import { BREADCRUMB_MAX_LENGTH } from "../config";

export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

export const downloadJson = (data, fileName) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
    });
    downloadFile(blob, fileName);
};

export const downloadFile = (data, fileName) => {
    let url;

    if (data instanceof Blob) {
        url = URL.createObjectURL(data);
    } else if (typeof data === "string") {
        url = data; // assume already a URL (data URL or external URL)
    } else {
        console.error("Invalid data type for download");
        return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke only if we created the object URL
    if (data instanceof Blob) URL.revokeObjectURL(url);
};

export const importJsonFile = (onJsonLoaded) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.style.display = "none";
    document.body.appendChild(input);

    const cleanup = () => {
        if (input.parentNode) document.body.removeChild(input);
    };

    input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                onJsonLoaded(event.target.result);
            } catch (err) {
                console.error("Failed to import drawing state:", err);
            }
        };
        reader.readAsText(file);
    };

    input.click();
    // Fallback cleanup in case user cancels file selection
    setTimeout(cleanup, 1000);
};

export const truncateText = (text, maxLength = 0, suffix = "") => {
    if (typeof text !== "string") return "";
    const limit = maxLength === 0 ? text.length : maxLength;
    return text.length > limit ? text.slice(0, limit) + suffix : text;
};

export const truncateBreadcrumb = (text, maxLength = BREADCRUMB_MAX_LENGTH) => {
    return truncateText(text, maxLength, "...");
};

export const getContentFileName = (id) => {
    return `${id}.json`;
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

export const debugLog = (message, data) => {
    console.log(`[DEBUG] ${message}:`, data);
};

export const errorLog = (message, data) => {
    console.error(`[Error] ${message}:`, data);
};

export const formatToReadable = (text) => {
    if (!text) return "";

    // Replace underscores/hyphens with spaces
    let result = text.replace(/[_\-]+/g, " ");

    // Add space before uppercase letters (camelCase or PascalCase)
    result = result.replace(/([a-z0-9])([A-Z])/g, "$1 $2");

    // Capitalize the first letter of each word
    result = result
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return result;
};

export const ORIENTATION = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal",
};

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
}
