import Paragraph from "@editorjs/paragraph";
import { CUSTOM_TOOLS } from "../config";

export default class TagLine extends Paragraph {
    static get toolbox() {
        return {
            title: "Tagline",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 5H19V6H5V5Z" fill="currentColor" /><path d="M5 10H19V11H5V10Z" fill="currentColor" /><path d="M5 15H15V16H5V15Z" fill="currentColor" /></svg>`,
        };
    }

    constructor({ data, config, api, readOnly }) {
        super({
            data,
            config: {
                ...config,
                placeholder: "Enter your project tagline here...",
            },
            api,
            readOnly,
        });
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
        return CUSTOM_TOOLS.TAGLINE.TYPE;
    }
}
