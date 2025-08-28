export const extractTagsFromContent = (content) => {
    if (!content?.blocks) return [];
    const allText = content.blocks
        .map((block) => {
            if (block.type === "paragraph" || block.type === "header") {
                return block.data.text || "";
            }
            return "";
        })
        .join(" ");

    return Array.from(allText.matchAll(/#\w+/g), (match) => match[0]);
};
