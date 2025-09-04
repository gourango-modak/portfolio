import { CUSTOM_TOOLS } from "../config/editorJs/editorTools";

export function extractTitle(editorJsData) {
    if (!editorJsData || !Array.isArray(editorJsData.blocks)) {
        return { title: null, content: editorJsData };
    }

    // Take the first title block only
    const titleBlock = editorJsData.blocks.find(
        (block) => block.type === CUSTOM_TOOLS.TITLE.TYPE
    );

    return titleBlock?.data?.text || "";
}

export function extractTags(editorJsData) {
    if (!editorJsData || !Array.isArray(editorJsData.blocks)) {
        return { tags: [], content: editorJsData };
    }

    const tagsSet = new Set();

    editorJsData.blocks.forEach((block) => {
        if (block.type === CUSTOM_TOOLS.TAGLIST.TYPE) {
            if (block.data && typeof block.data.text === "string") {
                // Split by comma, trim each tag, filter out empty strings
                const tags = block.data.text
                    .split(",")
                    .map((tag) => tag.replace(/&nbsp;/g, "").trim())
                    .filter((tag) => tag.length > 0);

                tags.forEach((tag) => tagsSet.add(tag));
            }
        }
    });

    return Array.from(tagsSet);
}

export function extractTagline(editorJsData) {
    if (!editorJsData || !Array.isArray(editorJsData.blocks)) {
        return { tagline: "", content: editorJsData };
    }

    const taglineBlock = editorJsData.blocks.find(
        (block) => block.type === CUSTOM_TOOLS.TAGLINE.TYPE
    );

    return taglineBlock?.data?.text || "";
}
