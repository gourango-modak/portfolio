import Paragraph from "@editorjs/paragraph";

export default class TagList extends Paragraph {
    static get toolbox() {
        return {
            title: "Tag List",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="3" x2="5" y2="11"/><line x1="9" y1="3" x2="9" y2="11"/><line x1="3" y1="5" x2="11" y2="5"/><line x1="3" y1="9" x2="11" y2="9"/></svg>`,
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
        return "tags";
    }
}
