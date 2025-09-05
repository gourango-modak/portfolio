import { CUSTOM_TOOLS } from "../editorJsConfig";

export default class InlineCode {
    static get isInline() {
        return true;
    }

    static get title() {
        return "Code";
    }

    constructor({ api }) {
        this.api = api;
        this.class =
            "bg-[#F2F2F2] text-[#242424] font-mono font-bold px-1 py-0.5 rounded inline-code";
    }

    render() {
        this.button = document.createElement("button");
        this.button.type = "button";
        this.button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8L5 12L9 16"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8L19 12L15 16"></path></svg>
        `;
        this.button.classList.add(this.api.styles.inlineToolButton);
        return this.button;
    }

    surround(range) {
        if (!range || range.collapsed) return;

        const text = range.toString();
        if (!text.trim()) return; // ignore only-space selection

        // Check if selection is already inside code
        const ancestor = range.commonAncestorContainer;
        const codeNode = ancestor.closest
            ? ancestor.closest("code")
            : this._findParentCode(ancestor);

        if (
            codeNode &&
            codeNode.contains(range.startContainer) &&
            codeNode.contains(range.endContainer)
        ) {
            // Toggle OFF: unwrap
            const textNode = document.createTextNode(codeNode.textContent);
            codeNode.parentNode.replaceChild(textNode, codeNode);
            this.api.selection.expandToTag(textNode);
            return;
        }

        // Split leading/trailing spaces
        const leadingSpaces = text.match(/^(\s*)/)[0];
        const trailingSpaces = text.match(/(\s*)$/)[0];
        const mainText = text.trim();
        if (!mainText) return;

        const fragment = document.createDocumentFragment();
        if (leadingSpaces)
            fragment.appendChild(document.createTextNode(leadingSpaces));

        const codeEl = document.createElement("code");
        codeEl.className = this.class;
        codeEl.textContent = mainText;
        fragment.appendChild(codeEl);

        if (trailingSpaces)
            fragment.appendChild(document.createTextNode(trailingSpaces));

        // Insert fragment in place
        range.deleteContents();
        range.insertNode(fragment);

        // Merge adjacent code blocks
        this._mergeAdjacentCode(codeEl);

        // Keep selection inside the new code
        this.api.selection.expandToTag(codeEl);
    }

    _mergeAdjacentCode(code) {
        const prev = code.previousSibling;
        const next = code.nextSibling;

        if (prev && prev.tagName === "CODE") {
            prev.textContent += code.textContent;
            code.parentNode.removeChild(code);
            code = prev;
        }

        if (next && next.tagName === "CODE") {
            code.textContent += next.textContent;
            next.parentNode.removeChild(next);
        }
    }

    _findParentCode(node) {
        while (node && node.tagName !== "CODE") {
            node = node.parentNode;
        }
        return node;
    }

    checkState(selection) {
        if (!selection) return false;

        const { anchorNode, focusNode } = selection;

        const isInsideCode = (node) => {
            if (!node) return false;
            return node.closest
                ? Boolean(node.closest("code"))
                : Boolean(this._findParentCode(node));
        };

        this.state = isInsideCode(anchorNode) || isInsideCode(focusNode);

        // Toggle toolbar button active state
        if (this.button) {
            this.state
                ? this.button.classList.add("ce-inline-tool--active")
                : this.button.classList.remove("ce-inline-tool--active");
        }

        return this.state;
    }

    static get sanitize() {
        return {
            code: true,
        };
    }

    static get type() {
        return CUSTOM_TOOLS.INLINE_CODE.TYPE;
    }
}
