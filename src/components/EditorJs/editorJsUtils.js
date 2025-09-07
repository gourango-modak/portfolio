import { CONTENT_TYPES } from "../../config";
import { CUSTOM_TOOLS, NON_RENDER_EDITORJS_BLOCKS } from "./editorJsConfig";

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

export const extractHeadings = (content, contentType) => {
    const headings = [];
    let lastH2 = null;

    content?.blocks?.forEach((block) => {
        if (block.type === "header") {
            const level = block.data.level;
            if (level === 2 || level === 3) {
                const heading = {
                    id: generateHeaderBlockId(block.data.text),
                    text: block.data.text,
                    level,
                    children: [],
                };

                if (level === 2) {
                    headings.push(heading);
                    lastH2 = heading;
                } else if (level === 3 && lastH2) {
                    lastH2.children.push(heading);
                } else {
                    headings.push(heading); // fallback in case no parent H2
                }
            }
        }
    });

    if (contentType == CONTENT_TYPES.PROJECT) {
        headings.push({
            id: "view-the-project",
            level: 2,
            text: "View the Project",
        });
    }

    return headings;
};

/**
 * Flatten nested headings into a flat array and a parent mapping
 */
export const flattenHeadings = (headings, parentMap = {}) => {
    let flat = [];
    headings.forEach((heading) => {
        const parentHeaderId = generateHeaderBlockId(heading.text);
        flat.push({ ...heading, id: parentHeaderId });
        if (heading.children?.length) {
            heading.children.forEach(
                (child) =>
                    (parentMap[generateHeaderBlockId(child.text)] =
                        parentHeaderId)
            );
            const { result: childFlat, parentMap: childMap } = flattenHeadings(
                heading.children,
                parentMap
            );
            flat = flat.concat(childFlat);
            Object.assign(parentMap, childMap);
        }
    });
    return { result: flat, parentMap };
};

const getRequiredOptions = (contentType) => {
    // Default required options for all content type
    const requiredOptions = {
        requireTitle: true,
        requireTags: false,
        requireTagline: false,
    };

    switch (contentType) {
        case CONTENT_TYPES.BLOG:
            return requiredOptions;
        case CONTENT_TYPES.PROJECT:
            requiredOptions.requireTitle = true;
            requiredOptions.requireTagline = true;
            return requiredOptions;
        default:
            return requiredOptions;
    }
};

export const validateEditorJsModal = (contentType, editorData, showAlert) => {
    const { requireTitle, requireTags, requireTagline } =
        getRequiredOptions(contentType);

    const errors = [];

    // Check for title
    if (requireTitle) {
        if (!extractTitle(editorData))
            errors.push("Please add a title before saving.");
    }

    // Check for tags (useful for projects)
    if (requireTags) {
        const tags = extractTags(editorData);
        if (!tags || tags.length === 0)
            errors.push("Please add project tech stacks by tag list.");
    }

    // Check for tagline (useful for projects)
    if (requireTagline) {
        if (!extractTagline(editorData))
            errors.push("Please add project tagline.");
    }

    // Display all errors if showAlert is provided
    if (showAlert && errors.length > 0) {
        showAlert(errors.join("\n"), {
            title: "Warning",
            type: "warning",
            // buttons: [
            //     { label: "Cancel", type: "secondary" },
            //     {
            //         label: "Delete",
            //         type: "primary",
            //         onClick: () => console.log("Deleted!"),
            //     },
            // ],
        });
    }

    return errors.length === 0; // valid if no errors
};

export const generateHeaderBlockId = (text, maxLength = 60) => {
    if (!text) return "";

    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces with dashes
        .replace(/[^a-z0-9-]/g, "") // remove special characters
        .replace(/-+/g, "-") // collapse multiple dashes
        .replace(/^-+|-+$/g, "") // remove leading/trailing dashes
        .slice(0, maxLength); // limit length
};

export const shouldRenderBlock = (block) =>
    !NON_RENDER_EDITORJS_BLOCKS.includes(block.type);
