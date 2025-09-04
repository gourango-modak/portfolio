import { CUSTOM_TOOLS } from "../editorTools";

class Code {
    static get toolbox() {
        return {
            title: "Code",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l-3 4 3 4M9 3l3 4-3 4"/></svg>`,
        };
    }

    constructor({ data }) {
        this.data = data || {};
        this.textarea = null;
        this.container = null;

        // Supported languages
        this.availableLanguages = [
            "javascript",
            "python",
            "bash",
            "html",
            "css",
            "csharp",
        ];
    }

    render() {
        this.container = this.createContainer();
        this.textarea = this.createTextarea(this.data.code || "");
        this.container.appendChild(this.textarea);

        // Trigger auto-resize if content exists
        setTimeout(() => this.autoResize(), 0);

        return this.container;
    }

    save() {
        const lines = this.textarea.value.split("\n");

        // First line must start with "// " and match a supported language
        let language = "";
        let codeStartIndex = 0;

        if (lines[0].startsWith("//")) {
            const possibleLang = lines[0]
                .replace("//", "")
                .trim()
                .toLowerCase();
            if (this.availableLanguages.includes(possibleLang)) {
                language = possibleLang;
                codeStartIndex = 1;
            }
        }

        const code = lines.slice(codeStartIndex).join("\n");

        return { language, code };
    }

    // ---------------- Helper Methods ----------------

    createContainer() {
        const container = document.createElement("div");
        container.classList.add("border-gray-300");
        return container;
    }

    createTextarea(initialValue) {
        const textarea = document.createElement("textarea");
        textarea.placeholder =
            "First line: // language (e.g., // javascript), then code...";
        textarea.value = initialValue;
        textarea.classList.add(
            "w-full",
            "bg-gray-50",
            "rounded-md",
            "p-4",
            "font-mono",
            "text-base",
            "outline-none",
            "resize-none"
        );

        // Initial height
        textarea.style.height = "120px";

        // Event listeners
        textarea.addEventListener("input", () => this.autoResize());
        textarea.addEventListener("keydown", (e) => this.handleEnter(e));

        return textarea;
    }

    autoResize() {
        if (!this.textarea) return;
        this.textarea.style.height = "auto";
        this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    }

    handleEnter(e) {
        if (e.key !== "Enter") return;

        e.stopPropagation();

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const value = this.textarea.value;

        this.textarea.value =
            value.substring(0, start) + "\n" + value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;

        this.autoResize();
        e.preventDefault();
    }

    static get type() {
        return CUSTOM_TOOLS.CODE;
    }
}

export default Code;
