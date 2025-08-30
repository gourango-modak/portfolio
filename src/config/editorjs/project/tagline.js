import Paragraph from "@editorjs/paragraph";

export default class TagLine extends Paragraph {
    static get toolbox() {
        return {
            title: "Tagline",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4H20V5H4V4Z" fill="currentColor" /><path d="M4 9H20V10H4V9Z" fill="currentColor" /><path d="M4 14H14V15H4V14Z" fill="currentColor" /></svg>`,
        };
    }

    // Override the type for the saved data
    save(blockContent) {
        const data = super.save(blockContent);
        return {
            ...data,
            // You can add extra fields here if needed
        };
    }

    static get pasteConfig() {
        return {};
    }

    // Change the block type for Editor.js
    static get type() {
        return "tagline";
    }
}
