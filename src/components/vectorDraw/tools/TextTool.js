import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { testTextHit } from "../shapes/shapeHitTesting/testTextHit";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";

// Minimum width for an empty text field to ensure visibility.
const MIN_TEXT_WIDTH = 20;

// Extra buffer space to prevent premature line wrapping.
// Without this, the next character typed could wrap too early
// because span.offsetWidth measures text tightly (no right padding).
// This value depends on the font used — 40px is a safe average.
const WIDTH_BUFFER = 40;

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
        this.shapeId = null;
    }

    onPointerDown(e) {
        const { shapes, shapeOrder, updateShape } = shapeSlice.getSlice();

        // Check if clicked inside an existing text shape
        const textShapes = shapeOrder
            .map((id) => shapes[id])
            .filter((s) => s && s.type === SHAPES.TEXT);

        const hitShape = textShapes.find((s) => testTextHit(s, e.tx, e.ty));

        if (this.shapeId === hitShape?.id) {
            return;
        }

        this.commitPendingInput();
        this.startPoint = { x: e.tx, y: e.ty };

        if (hitShape) {
            // Begin editing the existing shape
            updateShape(hitShape.id, { isEditing: true });
            this.shapeId = hitShape.id;

            // Update code so that text input load with the existing shape text
            this.createLivePath("foreignObject");
            this.createTextInput(hitShape);
        } else {
            // Create new text input at pointer position
            this.createLivePath("foreignObject");
            this.createTextInput();
        }
    }

    commitPendingInput() {
        let existingShape = null;

        if (this.shapeId) {
            const { shapes } = shapeSlice.getSlice();
            existingShape = shapes[this.shapeId];
        }

        const value = this.textarea?.value.trim();
        if (value) this.commitTextShape(value, existingShape);

        this.cleanUpTextInput();
    }

    commitTextShape(textValue, existingShape) {
        const { addShape, updateShape } = shapeSlice.getSlice();

        const fontSize =
            existingShape?.fontSize?.value || this.properties.fontSize.value;
        // span.offsetWidth measures only the exact visual width of the glyphs (no right-side margin),
        // so the rendered text might visually "touch" the shape border.
        // Adding +10px provides a small breathing space to avoid that tight look.
        const newWidth = this.span.offsetWidth + fontSize / 3;
        const newHeight = this.textarea.offsetHeight;

        if (this.shapeId) {
            // Update existing shape
            updateShape(this.shapeId, {
                isEditing: false,
                text: textValue,
                width: newWidth,
                height: newHeight,
            });
        } else {
            // Create new shape
            const { activeFrameId } = frameSlice.getSlice();
            const canvasMode =
                canvasPropertiesSlice.getSlice().properties.mode.value;

            const shape = {
                type: SHAPES.TEXT,
                x: this.startPoint.x,
                y: this.startPoint.y,
                text: textValue,
                width: newWidth,
                height: newHeight,
                properties: { ...this.properties },
            };

            if (canvasMode === CANVAS_MODES.PAGED) {
                shape.frameId = activeFrameId;
            }

            addShape(shape);
        }
    }

    cleanUpTextInput() {
        this.cleanUp();
        this.span?.remove?.();
        this.span = null;
        this.activeInput = null;
        this.startPoint = null;
        this.textarea = null;
        this.shapeId = null;
    }

    createTextInput(existingShape) {
        let text = "",
            point = this.startPoint,
            width = MIN_TEXT_WIDTH,
            properties = this.properties,
            fontSize = properties.fontSize.value,
            // Maintain single-line height baseline.
            minHeight = fontSize * 1.3,
            height = minHeight;

        if (existingShape) {
            // Reuse position and size for editing mode
            text = existingShape.text;
            point = {
                x: existingShape.x,
                y: existingShape.y,
            };

            width = existingShape.width + WIDTH_BUFFER;
            height = existingShape.height;
            fontSize = this.properties.fontSize.value;
            minHeight = fontSize * 1.3;
            properties = existingShape.properties;

            setTimeout(() => this.textarea.select(), 0);
        }

        this.setLivePathAttributes(point, width, height);

        this.textarea = this.createTextarea(width, height, text, properties);
        this.setupAutoGrow(minHeight, text, properties);
        this.livePath.appendChild(this.textarea);

        // Delay focus to ensure DOM insertion first
        setTimeout(() => this.textarea.focus(), 0);
    }

    setLivePathAttributes(point, width, height) {
        this.livePath.setAttribute("x", point.x);
        this.livePath.setAttribute("y", point.y);
        this.livePath.setAttribute("width", width);
        this.livePath.setAttribute("height", height);
    }

    createTextarea(width, height, value = "", properties) {
        const textarea = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "textarea"
        );
        textarea.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        textarea.rows = 1;
        textarea.value = value;

        textarea.style.cssText = `
            display: block;
            width: ${width}px;
            height: ${height}px;
            resize: none;
            border: none;
            outline: none;
            background-color: transparent;
            color: ${properties.color.value};
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-size: ${properties.fontSize.value}px;
            line-height: 1.3;
            font-family: '${properties.fontFamily.value}';
            overflow: hidden;
            letter-spacing: 0.1px;
        `;
        return textarea;
    }

    setupAutoGrow(minHeight, text, properties) {
        // Hidden span to measure text width dynamically.
        this.span = document.createElement("span");
        this.span.style.visibility = "hidden";
        this.span.style.position = "absolute";
        this.span.style.whiteSpace = "pre";
        this.span.style.fontFamily = properties.fontFamily.value;
        this.span.style.fontSize = `${properties.fontSize.value}px`;
        this.span.textContent = text;
        document.body.appendChild(this.span);

        const adjustSize = () => {
            // Adjust height
            this.textarea.style.height = "auto";
            const newHeight = Math.max(this.textarea.scrollHeight, minHeight);
            this.textarea.style.height = `${newHeight}px`;
            this.livePath.setAttribute("height", newHeight);

            // Adjust width
            this.span.style.fontSize = `${properties.fontSize.value}px`;
            this.span.textContent = this.textarea.value || " ";

            // Add buffer to prevent early line wrapping.
            const buffer = WIDTH_BUFFER;
            const newWidth = this.span.offsetWidth + buffer;
            this.textarea.style.width = `${newWidth}px`;
            this.livePath.setAttribute("width", newWidth);
        };

        // TODO: Commit shape on blur
        const commitOnBlur = () => {};

        this.textarea.addEventListener("input", adjustSize);
        this.textarea.addEventListener("blur", commitOnBlur);
    }
}
