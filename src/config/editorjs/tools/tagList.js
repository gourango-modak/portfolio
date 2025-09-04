import Paragraph from "@editorjs/paragraph";
import { CUSTOM_TOOLS } from "../editorTools";

export default class TagList extends Paragraph {
    static get toolbox() {
        return {
            title: "Tag List",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="18"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="16" x2="18" y2="16"/></svg>`,
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
        return CUSTOM_TOOLS.TAGLIST;
    }
}
