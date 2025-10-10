import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";

const MIN_TEXT_WIDTH = 20;

export class TextTool extends BaseTool {
    static name = TOOLS.TEXT;
    static label = "Text Tool";
    static shortcut = { code: "KeyI" };

    static defaultProperties = {
        color: {
            value: "#3b82f6",
            label: "Color",
            type: "color",
            id: "textColor",
        },
        fontSize: {
            value: 32,
            label: "Font Size",
            type: "slider",
            min: 12,
            max: 72,
            step: 1,
        },
        fontFamily: {
            value: "Caveat",
            label: "Font Family",
            type: "text",
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.activeInput = null;
        this.startPoint = null;
        this.textarea = null;
        this.span = null;
    }

    onPointerDown(e) {
        this.commitPendingInput();
        this.startPoint = { x: e.tx, y: e.ty };
        this.createLivePath("foreignObject");
        this.createTextInput();
    }

    commitPendingInput() {
        if (!this.activeInput) return;

        const value = this.textarea?.value.trim();
        if (value) this.commitTextShape(value);

        this.cleanUpTextInput();
    }

    commitTextShape(textValue) {
        const { addShape } = shapeSlice.getSlice();
        const { activeFrameId } = frameSlice.getSlice();
        const canvasMode =
            canvasPropertiesSlice.getSlice().properties.mode.value;

        const shape = {
            type: SHAPES.TEXT,
            x: this.startPoint.x,
            y: this.startPoint.y,
            text: textValue,
            width: this.textarea.offsetWidth,
            height: this.textarea.offsetHeight,
            properties: { ...this.properties },
        };

        if (canvasMode === CANVAS_MODES.PAGED) {
            shape.frameId = activeFrameId;
        }

        addShape(shape);
    }

    cleanUpTextInput() {
        this.cleanUp();
        this.span?.remove?.();
        this.span = null;
        this.activeInput = null;
        this.startPoint = null;
        this.textarea = null;
    }

    createTextInput() {
        const minHeight = this.properties.fontSize.value * 1.3;

        this.setLivePathAttributes(MIN_TEXT_WIDTH, minHeight);

        this.textarea = this.createTextarea(minHeight);
        this.setupAutoGrow(minHeight);
        this.livePath.appendChild(this.textarea);

        setTimeout(() => this.textarea.focus(), 0);
        this.activeInput = "ready";
    }

    setLivePathAttributes(width, height) {
        this.livePath.setAttribute("x", this.startPoint.x);
        this.livePath.setAttribute("y", this.startPoint.y);
        this.livePath.setAttribute("width", width);
        this.livePath.setAttribute("height", height);
    }

    createTextarea(minHeight) {
        const textarea = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "textarea"
        );
        textarea.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        textarea.rows = 1;

        textarea.style.cssText = `
            display: block;
            width: ${MIN_TEXT_WIDTH}px;
            height: ${minHeight}px;
            resize: none;
            border: none;
            outline: none;
            background-color: transparent;
            color: ${this.properties.color.value};
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-size: ${this.properties.fontSize.value}px;
            line-height: 1.3;
            font-family: '${this.properties.fontFamily.value}';
            overflow: hidden;
            letter-spacing: 0.1px;
        `;
        return textarea;
    }

    setupAutoGrow(minHeight) {
        this.span = document.createElement("span");
        this.span.style.visibility = "hidden";
        this.span.style.position = "absolute";
        this.span.style.whiteSpace = "pre";
        this.span.style.fontFamily = this.properties.fontFamily.value;
        document.body.appendChild(this.span);

        const adjustSize = () => {
            // Adjust height
            this.textarea.style.height = "auto";
            const newHeight = Math.max(this.textarea.scrollHeight, minHeight);
            this.textarea.style.height = `${newHeight}px`;
            this.livePath.setAttribute("height", newHeight);

            // Adjust width
            this.span.style.fontSize = `${this.properties.fontSize.value}px`;
            this.span.textContent = this.textarea.value || " ";
            // Add a small buffer to prevent the next character from immediately wrapping to the next line.
            // span.offsetWidth gives the exact width of the current text, so without a buffer, the next typed character
            // might touch the edge and force a line break prematurely.
            // And it depends on font-family
            const buffer = 12;
            const newWidth = this.span.offsetWidth + buffer;
            this.textarea.style.width = `${newWidth}px`;
            this.livePath.setAttribute("width", newWidth);
        };

        this.textarea.addEventListener("input", adjustSize);
    }
}
