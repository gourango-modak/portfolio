export function extractTitle(editorData) {
    if (!editorData || !Array.isArray(editorData.blocks)) {
        return { title: null, content: editorData };
    }

    let title = null;
    const remainingBlocks = [];

    for (const block of editorData.blocks) {
        if (block.type === "title" && !title) {
            // Take the first title block only
            title = block.data.text;
        } else {
            remainingBlocks.push(block);
        }
    }

    return {
        title: title,
        content: { ...editorData, blocks: remainingBlocks },
    };
}

export function extractTags(editorData) {
    if (!editorData || !Array.isArray(editorData.blocks)) {
        return { tags: [], content: editorData };
    }

    const tagsSet = new Set(); // Use a Set to remove duplicates
    const remainingBlocks = editorData.blocks.filter((block) => {
        if (block.type === "tag") {
            if (block.data && typeof block.data.text === "string") {
                const regex = /#\w+/g;
                const matches = block.data.text.match(regex);
                if (matches) {
                    matches.forEach((tag) => tagsSet.add(tag));
                }
            }
            return false; // remove the tag block
        }
        return true; // keep other blocks
    });

    return {
        tags: Array.from(tagsSet),
        content: { ...editorData, blocks: remainingBlocks },
    };
}

export function extractTagline(editorData) {
    if (!editorData || !Array.isArray(editorData.blocks)) {
        return { tagline: "", content: editorData };
    }

    let tagline = "";
    const remainingBlocks = editorData.blocks.filter((block) => {
        if (block.type === "tagline") {
            if (block.data && typeof block.data.text === "string") {
                tagline = block.data.text.trim();
            }
            return false; // remove this block
        }
        return true; // keep other blocks
    });
    return {
        tagline: tagline,
        content: { ...editorData, blocks: remainingBlocks },
    };
}
