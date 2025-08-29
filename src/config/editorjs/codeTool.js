class CodeTool {
    static get toolbox() {
        return {
            title: "Code",
            icon: "<svg>...</svg>",
        };
    }

    constructor({ data }) {
        this.data = data || {};
        this.textarea = null;
        this.container = null;
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
        const language = lines[0] || "";
        const code = lines.slice(1).join("\n");

        return {
            language: language.trim(),
            code,
        };
    }

    // ---------------- Helper Methods ----------------

    createContainer() {
        const container = document.createElement("div");
        container.classList.add(
            "border-gray-300" // keeping your original container style
        );
        return container;
    }

    createTextarea(initialValue) {
        const textarea = document.createElement("textarea");
        textarea.placeholder = "First line: language type, then code...";
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
        const initialHeight = 120;
        textarea.style.height = `${initialHeight}px`;

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

        e.stopPropagation(); // Prevent Editor.js from creating a new block

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const value = this.textarea.value;

        // Insert newline at cursor
        this.textarea.value =
            value.substring(0, start) + "\n" + value.substring(end);

        // Move cursor after newline
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;

        this.autoResize();
        e.preventDefault();
    }
}

export default CodeTool;
