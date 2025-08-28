export const truncateText = (text, maxLength = 0) => {
    if (typeof text !== "string") return "";

    const limit = maxLength === 0 ? text.length : maxLength;
    return text.length > limit ? text.slice(0, limit) + "..." : text;
};
