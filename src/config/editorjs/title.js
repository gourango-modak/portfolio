import Header from "@editorjs/header";

export default class TitleBlock extends Header {
    static get toolbox() {
        return {
            title: "Title",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 4v6" /><path d="M6.5 4v6" /><path d="M3.5 7h3" /><path d="M10.5 9.5V4.5l-1.5 0.75" /></svg>`,
        };
    }

    // Optional: override default config to always be H1
    constructor({ data, config, api, readOnly }) {
        super({
            data,
            config: {
                levels: [1],
                defaultLevel: 1,
                placeholder: "Enter your title here...",
            },
            api,
            readOnly,
        });
    }

    // Make sure saved type is "title" instead of "header"
    static get isInline() {
        return false;
    }

    static get pasteConfig() {
        return {};
    }

    save(blockContent) {
        const data = super.save(blockContent);
        return {
            ...data,
            level: 1, // enforce H1
        };
    }
}
