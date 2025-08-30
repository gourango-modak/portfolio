import { isValidUrl } from "../../../../utils/common";

export default class Gallery {
    static get toolbox() {
        return {
            title: "Gallery",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="1"/><path d="M19 15 14 10 5 21"/></svg>`,
        };
    }

    static get type() {
        return "gallery";
    }

    constructor({ data, api, readOnly }) {
        this.data = data?.images?.length
            ? data
            : { images: [{ url: "", caption: "" }] };
        this.api = api;
        this.readOnly = readOnly;

        this.wrapper = null;
        this.currentSlot = null;
        this.modalEl = null;
    }

    /** -------------------- RENDER -------------------- **/
    render() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("gallery-block", "py-4");
        this.renderGrid();
        return this.wrapper;
    }

    renderGrid() {
        this.wrapper.innerHTML = "";
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";

        this.data.images.forEach((imgData, index) => {
            grid.appendChild(this.createGridItem(imgData, index));
        });

        this.wrapper.appendChild(grid);
    }

    createGridItem(imgData, index) {
        const container = document.createElement("div");
        container.className =
            "relative w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden";

        if (imgData.url) {
            const imgEl = document.createElement("img");
            imgEl.src = imgData.url;
            imgEl.alt = imgData.caption || "";
            imgEl.className = "w-full h-full object-cover";
            container.appendChild(imgEl);
        } else if (!this.readOnly) {
            const addBtn = this.createButton(
                "+ Add Image",
                "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
                () => this.openModal(index)
            );
            container.appendChild(addBtn);
        }

        return container;
    }

    /** -------------------- MODAL -------------------- **/
    openModal(index) {
        this.currentSlot = index;
        this.modalEl = this.createOverlay();

        const modalContainer = this.createModalContainer();
        modalContainer.appendChild(this.createModalHeader());

        const { urlInput, urlError, captionInput } =
            this.createModalBody(modalContainer);
        modalContainer.appendChild(
            this.createModalFooter(urlInput, urlError, captionInput)
        );

        this.modalEl.appendChild(modalContainer);
        document.body.appendChild(this.modalEl);

        urlInput.focus();
    }

    createOverlay() {
        const overlay = document.createElement("div");
        overlay.className =
            "fixed inset-0 bg-black/60 z-50 p-4 overflow-auto hide-scrollbar flex justify-center items-start sm:items-center";
        return overlay;
    }

    createModalContainer() {
        const modal = document.createElement("div");
        modal.className = "bg-white rounded-lg shadow-2xl w-full max-w-lg";
        return modal;
    }

    createModalHeader() {
        const header = document.createElement("div");
        header.className =
            "p-6 border-b border-gray-200 flex justify-between items-center";

        const title = document.createElement("h2");
        title.className = "text-2xl font-bold text-slate-800";
        title.innerText = "Add Image";

        const closeBtn = this.createButton(
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="lucide lucide-x">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`,
            "text-slate-400 hover:text-slate-600 cursor-pointer",
            () => this.closeModal(),
            true
        );

        header.appendChild(title);
        header.appendChild(closeBtn);
        return header;
    }

    createModalBody(modalContainer) {
        const body = document.createElement("div");
        body.className = "p-6 overflow-y-auto";

        // Image URL (required)
        const {
            group: urlGroup,
            input: urlInput,
            error: urlError,
        } = this.createInputGroup("Image URL", true, "Enter image URL");
        body.appendChild(urlGroup);

        // Caption (optional)
        const { group: captionGroup, input: captionInput } =
            this.createInputGroup("Caption", false, "Enter caption (optional)");
        body.appendChild(captionGroup);

        modalContainer.appendChild(body);

        // Live validation for URL
        urlInput.addEventListener("input", () => {
            if (urlInput.value.trim()) {
                urlError.classList.add("hidden");
                this.setValidInput(urlInput);
            }
        });

        return { urlInput, urlError, captionInput };
    }

    createModalFooter(urlInput, urlError, captionInput) {
        const footer = document.createElement("div");
        footer.className =
            "p-6 border-t border-gray-200 flex justify-end gap-4 rounded-b-lg";

        const cancelBtn = this.createButton(
            "Cancel",
            "bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300",
            () => this.closeModal()
        );

        const addBtn = this.createButton(
            "Add",
            "bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700",
            () => {
                const url = urlInput.value.trim();
                const caption = captionInput.value.trim();

                if (!url) {
                    urlError.innerText = "Image URL is required.";
                    urlError.classList.remove("hidden");
                    this.setInvalidInput(urlInput);
                    return;
                }

                if (!isValidUrl(url)) {
                    urlError.innerText = "Invalid URL format.";
                    urlError.classList.remove("hidden");
                    this.setInvalidInput(urlInput);
                    return;
                }

                this.addImage(url, caption);
                this.closeModal();
            }
        );

        footer.appendChild(cancelBtn);
        footer.appendChild(addBtn);
        return footer;
    }

    /** -------------------- INPUT HELPERS -------------------- **/
    createInputGroup(labelText, required = false, placeholder = "") {
        const group = document.createElement("div");
        group.className = "mb-4";

        const label = document.createElement("label");
        label.className = "block text-sm font-medium text-slate-700 mb-2";
        label.innerHTML = required
            ? `${labelText} <span class="text-red-500">*</span>`
            : labelText;

        const input = document.createElement("textarea");
        input.placeholder = placeholder;
        input.className =
            "w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hide-scrollbar";
        input.rows = 1;
        input.style.overflow = "hidden";

        const error = document.createElement("p");
        error.className = "text-red-500 text-sm mt-1 hidden";
        error.innerText = `${labelText} is required.`;

        group.appendChild(label);
        group.appendChild(input);
        group.appendChild(error);

        return { group, input, error };
    }

    setInvalidInput(input) {
        input.classList.add(
            "border-red-500",
            "focus:ring-red-500",
            "focus:border-red-500"
        );
        input.classList.remove(
            "focus:ring-indigo-500",
            "focus:border-indigo-500"
        );
    }

    setValidInput(input) {
        input.classList.remove(
            "border-red-500",
            "focus:ring-red-500",
            "focus:border-red-500"
        );
        input.classList.add("focus:ring-indigo-500", "focus:border-indigo-500");
    }

    createButton(text, className, onClick, isHtml = false) {
        const btn = document.createElement("button");
        btn.className = className;
        isHtml ? (btn.innerHTML = text) : (btn.innerText = text);
        btn.addEventListener("click", onClick);
        return btn;
    }

    /** -------------------- CORE LOGIC -------------------- **/
    closeModal() {
        if (this.modalEl) {
            document.body.removeChild(this.modalEl);
            this.modalEl = null;
            this.currentSlot = null;
        }
    }

    addImage(url, caption) {
        this.data.images[this.currentSlot] = { url, caption };
        if (this.currentSlot === this.data.images.length - 1) {
            this.data.images.push({ url: "", caption: "" });
        }
        this.renderGrid();
    }

    save() {
        return { images: this.data.images.filter((img) => img.url) };
    }
}
