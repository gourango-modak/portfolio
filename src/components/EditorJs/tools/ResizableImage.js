import { fileToBase64 } from "../../../utils/common";
import { CUSTOM_TOOLS } from "../config";

export default class ResizableImage {
    static get toolbox() {
        return {
            title: "Image",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image"><g transform="translate(3 3) scale(0.75)"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></g></svg>`,
        };
    }

    static get type() {
        return CUSTOM_TOOLS.RESIZABLE_IMAGE.TYPE;
    }

    constructor({ data, api }) {
        this.api = api;
        this.data = data || {};
        this.wrapper = null;
        this.fileInput = null;
        this.isNew = !this.data.url; // detect new block
    }

    render() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("resizable-image-wrapper");

        this.fileInput = document.createElement("input");
        this.fileInput.type = "file";
        this.fileInput.accept = "image/*";
        this.fileInput.style.display = "none";

        this.fileInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Convert file to Base64
            const base64 = await fileToBase64(file);
            this.data.url = base64;
            this.data.name = file.name;

            this._createImage(base64);
        });

        this.wrapper.appendChild(this.fileInput);

        if (this.isNew) {
            // Only trigger file picker for NEW blocks
            setTimeout(() => this.fileInput.click(), 0);
        }

        if (this.data.url) {
            this._createImage(this.data.url);
        }

        return this.wrapper;
    }

    _createReplaceSvg() {
        const svgNS = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.classList.add("lucide", "lucide-paperclip-icon");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute(
            "d",
            "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"
        );

        svg.appendChild(path);

        return svg;
    }

    _createResetSvg() {
        const svgNS = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.classList.add("lucide", "lucide-rotate-ccw");

        const path1 = document.createElementNS(svgNS, "path");
        path1.setAttribute(
            "d",
            "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
        );

        const path2 = document.createElementNS(svgNS, "path");
        path2.setAttribute("d", "M3 3v5h5");

        svg.appendChild(path1);
        svg.appendChild(path2);

        return svg;
    }

    _toggleImageAlignment(container, alignBtn) {
        const current = this.data.alignment || "center";
        const next =
            current === "left"
                ? "center"
                : current === "center"
                ? "right"
                : "left";
        this.data.alignment = next;
        this._setImageAlignment(container, next);
        alignBtn.innerHTML = this._getAlignIcon(next);
    }

    _setImageAlignment(container, align) {
        container.style.display = "flex";
        container.style.flexDirection = "column";

        switch (align) {
            case "left":
                container.style.alignItems = "flex-start";
                break;
            case "center":
                container.style.alignItems = "center";
                break;
            case "right":
                container.style.alignItems = "flex-end";
                break;
        }
    }

    _getAlignIcon(align) {
        const color = "currentColor";
        const stroke = `stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'`;

        switch (align) {
            case "left":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ${stroke}><line x1="4" y1="4" x2="4" y2="20"/><rect x="6" y="8" width="14" height="8"/></svg>`;
            case "center":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ${stroke}><line x1="12" y1="4" x2="12" y2="20"/><rect x="5" y="8" width="14" height="8"/></svg>`;
            case "right":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ${stroke}><line x1="20" y1="4" x2="20" y2="20"/><rect x="4" y="8" width="14" height="8"/></svg>`;
            default:
                return "";
        }
    }

    _createImage(url) {
        this.wrapper.innerHTML = ""; // clear wrapper

        const container = document.createElement("div");
        container.classList.add("image-container");

        // Toolbar above the image
        const toolbar = document.createElement("div");
        toolbar.classList.add("image-toolbar");

        const replaceBtn = document.createElement("button");
        replaceBtn.onclick = () => this.fileInput.click();
        replaceBtn.appendChild(this._createReplaceSvg());

        const resetBtn = document.createElement("button");
        resetBtn.onclick = () => {
            img.style.width = this.originalWidth;
            img.style.height = this.originalHeight;
            this.data.width = this.originalWidth;
            this.data.height = this.originalHeight;
        };
        resetBtn.appendChild(this._createResetSvg());

        // Alignment button (cycles left → center → right)
        const alignBtn = document.createElement("button");
        alignBtn.title = "Align Image";
        alignBtn.innerHTML = this._getAlignIcon(
            this.data.alignment || "center"
        );
        alignBtn.onclick = () =>
            this._toggleImageAlignment(container, alignBtn);

        toolbar.appendChild(alignBtn);
        toolbar.appendChild(replaceBtn);
        toolbar.appendChild(resetBtn);

        // Alignment wrapper to preserve resizer positions
        const alignWrapper = document.createElement("div");
        alignWrapper.classList.add("image-align-wrapper");

        // Image element
        const img = document.createElement("img");
        img.src = url;
        img.style.width = this.data.width || "100%";
        img.style.height = this.data.height || "auto";

        alignWrapper.appendChild(img);
        alignWrapper.appendChild(toolbar);

        // Save original dimensions for reset
        this.originalWidth = img.style.width;
        this.originalHeight = img.style.height;

        // Resizers (inside alignWrapper)
        const resizers = ["nw", "ne", "sw", "se", "n", "s", "w", "e"];
        resizers.forEach((pos) => {
            const resizer = document.createElement("div");
            resizer.classList.add("resizer", pos);
            alignWrapper.appendChild(resizer);
            this._makeResizable(img, resizer, pos);
        });

        // Append align wrapper to main container
        container.appendChild(alignWrapper);

        // Apply current alignment
        const align = this.data.alignment || "center";
        this._setImageAlignment(container, align);

        this.wrapper.appendChild(container);
    }

    _makeResizable(img, resizer, position) {
        let startX, startY, startWidth, startHeight, aspectRatio;
        let isDragging = false;

        const doDrag = (e) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // Disable Editor.js block highlight while dragging
            document.querySelectorAll(".ce-block--selected").forEach((el) => {
                el.classList.remove("ce-block--selected");
            });

            switch (position) {
                case "e":
                    img.style.width = startWidth + dx + "px";
                    break;
                case "w":
                    img.style.width = startWidth - dx + "px";
                    break;
                case "s":
                    img.style.height = startHeight + dy + "px";
                    break;
                case "n":
                    img.style.height = startHeight - dy + "px";
                    break;
                case "ne": {
                    const wNE = startWidth + dx;
                    img.style.width = wNE + "px";
                    img.style.height = wNE / aspectRatio + "px";
                    break;
                }
                case "nw": {
                    const wNW = startWidth - dx;
                    img.style.width = wNW + "px";
                    img.style.height = wNW / aspectRatio + "px";
                    break;
                }
                case "se": {
                    const wSE = startWidth + dx;
                    img.style.width = wSE + "px";
                    img.style.height = wSE / aspectRatio + "px";
                    break;
                }
                case "sw": {
                    const wSW = startWidth - dx;
                    img.style.width = wSW + "px";
                    img.style.height = wSW / aspectRatio + "px";
                    break;
                }
            }
        };

        const stopDrag = () => {
            isDragging = false;
            this.data.width = img.style.width;
            this.data.height = img.style.height;

            // Remove resizing class so handles hide when not hovered
            img.parentElement.classList.remove("dragging");

            document.documentElement.removeEventListener("mousemove", doDrag);
            document.documentElement.removeEventListener("mouseup", stopDrag);
        };

        resizer.addEventListener("mousedown", (e) => {
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            startWidth = img.offsetWidth;
            startHeight = img.offsetHeight;
            aspectRatio = startWidth / startHeight;
            isDragging = true;

            // Add resizing class to keep handles visible during drag
            img.parentElement.classList.add("dragging");

            document.documentElement.addEventListener("mousemove", doDrag);
            document.documentElement.addEventListener("mouseup", stopDrag);
        });
    }

    save() {
        return {
            url: this.data.url,
            name: this.data.name,
            width: this.data.width || "auto",
            height: this.data.height || "auto",
            alignment: this.data.alignment || "center",
        };
    }
}
