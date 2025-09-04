import { NON_RENDER_EDITORJS_BLOCKS } from "../config/config";
import { CUSTOM_TOOLS } from "../config/editorJs/editorTools";

export function extractTitle(editorData) {
    if (!editorData || !Array.isArray(editorData.blocks)) {
        return { title: null, content: editorData };
    }

    // Take the first title block only
    const titleBlock = editorData.blocks.find(
        (block) => block.type === CUSTOM_TOOLS.TITLE.TYPE
    );

    return titleBlock?.data?.text || "";
}

export function extractTags(editorData) {
    if (!editorData || !Array.isArray(editorData.blocks)) {
        return { tags: [], content: editorData };
    }

    const tagsSet = new Set();

    editorData.blocks.forEach((block) => {
        if (block.type === CUSTOM_TOOLS.TAGLIST.TYPE) {
            if (block.data && typeof block.data.text === "string") {
                const regex = /#\w+/g;
                const matches = block.data.text.match(regex);
                if (matches) {
                    matches.forEach((tag) => tagsSet.add(tag));
                }
            }
        }
    });

    return Array.from(tagsSet);
}

export function extractTagline(editorData) {
    if (!editorData || !Array.isArray(editorData.blocks)) {
        return { tagline: "", content: editorData };
    }

    const taglineBlock = editorData.blocks.find(
        (block) => block.type === CUSTOM_TOOLS.TAGLINE.TYPE
    );

    return taglineBlock?.data?.text || "";
}

export const filterEditorBlocks = (editorJsData) => {
    if (!editorJsData) return { blocks: [] };

    const remainingBlocks = editorJsData.blocks.filter(
        (block) => !NON_RENDER_EDITORJS_BLOCKS.includes(block.type)
    );

    return { ...editorJsData, blocks: remainingBlocks };
};
