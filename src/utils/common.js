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

export const truncateBreadcrumb = (text, maxLength = 20) => {
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
