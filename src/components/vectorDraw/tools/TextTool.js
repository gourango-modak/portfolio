import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { testTextHit } from "../shapes/shapeHitTesting/testTextHit";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";

// Minimum width for an empty text field to ensure visibility.
const MIN_TEXT_WIDTH = 20;

// Extra buffer space to prevent premature line wrapping. // Without this, the next character typed could wrap too early // because span.offsetWidth measures text tightly (no right padding). // This value depends on the font used — 40px is a safe average.
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
        fontFamily: { value: "Caveat", label: "Font Family", type: "text" },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.textarea = null;
        this.span = null;
        this.shapeId = null;
        this.startPoint = null;

        // When user clicks while a textarea is active, we store that click here
        // so blur can consume it and create the next input at that location.
        this.pendingPointer = null;

        // snapshot of props used for current text input
        this.activeInputProperties = null;
    }

    onPointerDown(e) {
        const { shapes, shapeOrder, updateShape } = shapeSlice.getSlice();

        // If an input is active, capture the click so blur can create the next input there.
        if (this.textarea) {
            this.capturePendingPointer(e, shapes, shapeOrder);
            return; // Don't create/commit anything here — let blur handle commit and creation.
        }

        // No active textarea -> normal behavior: create or edit at click
        const hitShape = this.findTextShapeAtPoint(
            e.tx,
            e.ty,
            shapes,
            shapeOrder
        );
        this.startPoint = { x: e.tx, y: e.ty };

        if (hitShape) {
            this.startEditingExistingShape(hitShape, updateShape);
        } else {
            this.startNewTextInput();
        }
    }

    capturePendingPointer(e, shapes, shapeOrder) {
        const hitShape = this.findTextShapeAtPoint(
            e.tx,
            e.ty,
            shapes,
            shapeOrder
        );

        // store intent: coords + (optional) id of text shape hit
        this.pendingPointer = hitShape
            ? { x: e.tx, y: e.ty, hitId: hitShape.id }
            : { x: e.tx, y: e.ty, hitId: null };
    }

    findTextShapeAtPoint(x, y, shapes, shapeOrder) {
        const textShapes = this.getTextShapes(shapes, shapeOrder);
        return textShapes.find((s) => testTextHit(s, x, y));
    }

    getTextShapes(shapes, shapeOrder) {
        return shapeOrder
            .map((id) => shapes[id])
            .filter((s) => s && s.type === SHAPES.TEXT);
    }

    startEditingExistingShape(hitShape, updateShape) {
        updateShape(hitShape.id, { isEditing: true });
        this.shapeId = hitShape.id;
        this.createLivePath("foreignObject");
        this.createTextInput(hitShape);
    }

    startNewTextInput() {
        this.shapeId = null;
        this.createLivePath("foreignObject");
        this.createTextInput();
    }

    commitTextShape(textValue, existingShape) {
        const { updateShape } = shapeSlice.getSlice();

        const fontSize =
            existingShape?.properties?.fontSize?.value ||
            this.properties.fontSize.value;

        // span.offsetWidth measures only the exact visual width of the glyphs (no right-side margin),
        // so the rendered text might visually "touch" the shape border.
        // Adding (fontSize / 3) provides a small breathing space to avoid that tight look.
        const newWidth =
            (this.span?.offsetWidth || MIN_TEXT_WIDTH) + fontSize / 3;
        const newHeight = this.textarea?.offsetHeight || fontSize * 1.3;

        if (this.shapeId) {
            updateShape(this.shapeId, {
                isEditing: false,
                text: textValue,
                width: newWidth,
                height: newHeight,
            });
        } else {
            this.addNewTextShape(textValue, newWidth, newHeight);
        }
    }

    addNewTextShape(textValue, width, height) {
        const { addShape } = shapeSlice.getSlice();
        const { activeFrameId } = frameSlice.getSlice();
        const canvasMode =
            canvasPropertiesSlice.getSlice().properties.mode.value;

        const shape = {
            type: SHAPES.TEXT,
            x: this.startPoint.x,
            y: this.startPoint.y,
            text: textValue,
            width,
            height,
            properties: { ...this.activeInputProperties },
        };

        if (canvasMode === CANVAS_MODES.PAGED) {
            shape.frameId = activeFrameId;
        }

        addShape(shape);
    }

    cleanUpTextInput() {
        // remove DOM elements and reset local state (but NOT pendingPointer — it's handled separately)
        this.span?.remove?.();
        this.span = null;
        this.textarea?.remove?.();
        this.textarea = null;
        this.shapeId = null;
        this.startPoint = null;
        this.cleanUp(); // removes livePath etc.
    }

    createTextInput(existingShape) {
        const { text, point, width, height, properties, minHeight } =
            this.getTextInputInitialState(existingShape);

        this.activeInputProperties = properties;

        this.setLivePathAttributes(point, width, height);

        this.textarea = this.createTextarea(width, height, text, properties);
        this.setupAutoGrow(minHeight, text, properties);

        this.livePath.appendChild(this.textarea);
        setTimeout(() => this.textarea.focus(), 0);
        if (existingShape) setTimeout(() => this.textarea.select(), 0);
    }

    getTextInputInitialState(existingShape) {
        let text = "",
            point = this.startPoint,
            width = MIN_TEXT_WIDTH,
            properties = this.properties,
            fontSize = properties.fontSize.value,
            minHeight = fontSize * 1.3,
            height = minHeight;

        if (existingShape) {
            text = existingShape.text;
            point = { x: existingShape.x, y: existingShape.y };
            width = existingShape.width + WIDTH_BUFFER;
            height = existingShape.height;
            properties = existingShape.properties;
        }

        return { text, point, width, height, properties, minHeight };
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
        this.span = this.createHiddenSpan(text, properties);

        const adjustSize = () => this.adjustTextareaSize(minHeight, properties);
        const commitOnBlur = () => this.handleBlurCommit();

        this.textarea.addEventListener("input", adjustSize);
        this.textarea.addEventListener("blur", commitOnBlur);
    }

    createHiddenSpan(text, properties) {
        const span = document.createElement("span");
        Object.assign(span.style, {
            visibility: "hidden",
            position: "absolute",
            whiteSpace: "pre",
            fontFamily: properties.fontFamily.value,
            fontSize: `${properties.fontSize.value}px`,
        });
        span.textContent = text || " ";
        document.body.appendChild(span);
        return span;
    }

    adjustTextareaSize(minHeight, properties) {
        if (!this.textarea) return;
        this.textarea.style.height = "auto";
        const newHeight = Math.max(this.textarea.scrollHeight, minHeight);
        this.textarea.style.height = `${newHeight}px`;
        this.livePath.setAttribute("height", newHeight);

        this.span.style.fontSize = `${properties.fontSize.value}px`;
        this.span.textContent = this.textarea.value || " ";
        const newWidth = this.span.offsetWidth + WIDTH_BUFFER;
        this.textarea.style.width = `${newWidth}px`;
        this.livePath.setAttribute("width", newWidth);
    }

    handleBlurCommit() {
        if (!this.textarea) return;

        // Capture and clear pending pointer before we mutate state
        const ptr = this.pendingPointer;
        this.pendingPointer = null;

        // commit current input (use current startPoint / span / textarea)
        const existingShape = this.shapeId
            ? shapeSlice.getSlice().shapes[this.shapeId]
            : null;
        const value = this.textarea.value.trim();
        if (value) {
            this.commitTextShape(value, existingShape);
        }

        // cleanup current input
        this.cleanUpTextInput();

        // If user clicked while textarea was active, create a new input at that click
        if (ptr) {
            this.startPoint = { x: ptr.x, y: ptr.y };
            ptr.hitId
                ? this.editClickedShape(ptr.hitId)
                : this.startNewTextInput();
        }
    }

    editClickedShape(hitId) {
        const { updateShape, shapes } = shapeSlice.getSlice();
        updateShape(hitId, { isEditing: true });
        this.shapeId = hitId;
        const existing = shapes[hitId];
        this.createLivePath("foreignObject");
        this.createTextInput(existing);
    }
}
