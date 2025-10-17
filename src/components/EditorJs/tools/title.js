import { CUSTOM_TOOLS } from "../editorJsConfig";

export default class Title {
    static get toolbox() {
        return {
            title: "Title",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 4v6" /><path d="M6.5 4v6" /><path d="M3.5 7h3" /><path d="M10.5 9.5V4.5l-1.5 0.75" /></svg>`,
        };
    }

    static get isInline() {
        return false;
    }

    constructor({ data, api, readOnly }) {
        this.api = api;
        this.readOnly = readOnly;
        this.data = {
            text: data?.text || "",
        };
        this.placeholder = "Enter title...";
    }

    render() {
        const div = document.createElement("div");
        div.contentEditable = !this.readOnly;
        div.innerText = this.data.text;
        div.classList.add("ce-header", "ce-title-block", "title"); // optional CSS class

        // Optional: handle input changes
        div.addEventListener("input", (e) => {
            this.data.text = e.target.innerText;
        });

        return div;
    }

    save(blockContent) {
        return {
            text: blockContent.innerText,
        };
    }

    // Paste handling
    static get pasteConfig() {
        return {
            onPaste: {
                handler: (event) => {
                    const pastedText =
                        event.detail?.data?.innerText ||
                        event.detail?.data?.text ||
                        "";
                    return {
                        text: pastedText,
                    };
                },
            },
        };
    }

    static get type() {
        return CUSTOM_TOOLS.TITLE.TYPE;
    }
}
