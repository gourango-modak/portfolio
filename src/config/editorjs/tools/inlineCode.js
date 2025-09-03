export default class InlineCode {
    static get isInline() {
        return true;
    }

    static get title() {
        return "Code";
    }

    constructor({ api }) {
        this.api = api;
        // Tailwind classes
        this.class = "bg-gray-100 text-red-600 font-mono px-1 rounded";
    }

    render() {
        this.button = document.createElement("button");
        this.button.type = "button";
        this.button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
        `;
        this.button.classList.add(this.api.styles.inlineToolButton);
        return this.button;
    }

    surround(range) {
        if (!range) return;

        const ancestor = range.commonAncestorContainer;
        const codeNode = ancestor.closest
            ? ancestor.closest("code")
            : this._findParentCode(ancestor);

        // TOGGLE OFF
        if (
            codeNode &&
            codeNode.contains(range.startContainer) &&
            codeNode.contains(range.endContainer)
        ) {
            const textNode = document.createTextNode(codeNode.textContent);
            codeNode.parentNode.replaceChild(textNode, codeNode);
            this.api.selection.expandToTag(textNode);
            return;
        }

        // Extract selection
        const selectedContent = range.extractContents();
        const text = selectedContent.textContent;

        if (!text.trim()) return; // do not wrap empty or spaces

        // Split spaces from text
        const leadingSpaces = text.match(/^(\s*)/)[0];
        const trailingSpaces = text.match(/(\s*)$/)[0];
        const mainText = text.trim();

        if (!mainText) return;

        const fragment = document.createDocumentFragment();

        // Insert leading spaces
        if (leadingSpaces)
            fragment.appendChild(document.createTextNode(leadingSpaces));

        // Wrap main text in code
        const codeElement = document.createElement("code");
        codeElement.className = this.class;
        codeElement.textContent = mainText;
        fragment.appendChild(codeElement);

        // Insert trailing spaces
        if (trailingSpaces)
            fragment.appendChild(document.createTextNode(trailingSpaces));

        // Insert fragment back
        range.insertNode(fragment);

        // Merge adjacent <code> if any
        this._mergeAdjacentCode(codeElement);

        // Set selection to newly created code element
        this.api.selection.expandToTag(codeElement);
    }

    _mergeAdjacentCode(code) {
        const prev = code.previousSibling;
        const next = code.nextSibling;

        // Merge previous
        if (prev && prev.tagName === "CODE") {
            prev.textContent += code.textContent;
            code.parentNode.removeChild(code);
            code = prev;
        }

        // Merge next
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
        const ancestor = selection.anchorNode?.parentNode;
        return ancestor?.tagName === "CODE";
    }

    static get sanitize() {
        return {
            code: true,
        };
    }
}
