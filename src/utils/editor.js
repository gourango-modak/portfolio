export function extractTitle(data) {
    if (!data || !Array.isArray(data.blocks)) {
        return { title: null, content: data };
    }

    let title = null;
    const remainingBlocks = [];

    for (const block of data.blocks) {
        if (block.type === "title" && !title) {
            // Take the first title block only
            title = block.data.text;
        } else {
            remainingBlocks.push(block);
        }
    }

    return {
        title: title,
        content: { ...data, blocks: remainingBlocks },
    };
}

export function extractTags(data) {
    if (!data || !Array.isArray(data.blocks)) {
        return { tags: [], content: data };
    }

    const tagsSet = new Set(); // Use a Set to remove duplicates
    const remainingBlocks = data.blocks.filter((block) => {
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
        content: { ...data, blocks: remainingBlocks },
    };
}

export function extractTagline(data) {
    if (!data || !Array.isArray(data.blocks)) {
        return { tagline: "", content: data };
    }

    let tagline = "";
    const remainingBlocks = data.blocks.filter((block) => {
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
        content: { ...data, blocks: remainingBlocks },
    };
}
