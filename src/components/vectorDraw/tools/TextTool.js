import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { testTextHit } from "../shapes/shapeHitTesting/testTextHit";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { toViewportPoint } from "../utils/canvasUtils";
import { resolveShapeFrameId } from "../utils/frameUtils";
import { BaseTool } from "./BaseTool";
import { TEXT_LINE_HEIGHT, TOOLS } from "./constants";

// Minimum width for an empty text field to ensure visibility.
const MIN_TEXT_WIDTH = 20;

// Extra buffer space to prevent premature line wrapping. // Without this, the next character typed could wrap too early // because span.offsetWidth measures text tightly (no right padding). // This value depends on the font used — 40px is a safe average.
const WIDTH_BUFFER = 40;

// Padding from viewport right edge
const PADDING_RIGHT = 2;

export class TextTool extends BaseTool {
    static name = TOOLS.TEXT;
    static label = "Text Tool";
    static shortcut = { code: "KeyI" };
    static cursor = "text";

    static defaultProperties = {
        color: {
            value: "#3b82f6",
            label: "Color",
            type: "color",
            id: "textColor",
        },
        fontSize: {
            value: 48,
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

        // store the actual width used
        this.currentTextareaWidth = null;
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
        this.createLiveElement("foreignObject");
        this.createTextInput(hitShape);
    }

    startNewTextInput() {
        this.shapeId = null;
        this.createLiveElement("foreignObject");
        this.createTextInput();
    }

    commitTextShape(textContent, existingShape) {
        const { updateShape } = shapeSlice.getSlice();

        const appliedFontSize =
            existingShape?.properties?.fontSize?.value ||
            this.activeInputProperties.fontSize.value;

        // Measure text width visually using span and add a small buffer for spacing
        const measuredTextWidth =
            (this.span?.offsetWidth || MIN_TEXT_WIDTH) + appliedFontSize / 3;

        // Count the number of lines (newlines) entered by the user
        const lineCount = textContent.split("\n").length;

        // Compute final height based on number of lines and line height
        const calculatedHeight = lineCount * appliedFontSize * TEXT_LINE_HEIGHT;

        if (this.shapeId) {
            updateShape(this.shapeId, {
                isEditing: false,
                text: textContent,
                width: measuredTextWidth,
                height: calculatedHeight,
            });
        } else {
            this.addNewTextShape(
                textContent,
                measuredTextWidth,
                calculatedHeight
            );
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

        shape.frameId = resolveShapeFrameId(shape);
        addShape(shape);
    }

    cleanUpTextInput() {
        this.currentTextareaWidth = null;
        this.activeInputProperties = null;
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
        this.setupAutoGrow(point, minHeight, text, properties);

        this.liveElement.appendChild(this.textarea);
        setTimeout(() => this.textarea.focus(), 0);
        if (existingShape) setTimeout(() => this.textarea.select(), 0);
    }

    getTextInputInitialState(existingShape) {
        let text = "",
            point = this.startPoint,
            width = MIN_TEXT_WIDTH,
            properties = this.properties,
            fontSize = properties.fontSize.value,
            minHeight = fontSize * TEXT_LINE_HEIGHT,
            height = minHeight;

        if (existingShape) {
            const startX = existingShape.x;
            const startY = existingShape.y;

            // Compute width based on existing shape and viewport
            width = this.calculateTextareaWidth(
                0,
                { x: startX, y: startY },
                existingShape.width
            );

            // save the final applied width
            this.currentTextareaWidth = width;

            text = existingShape.text;
            point = { x: existingShape.x, y: existingShape.y };
            height = existingShape.height;
            properties = existingShape.properties;
        }

        return { text, point, width, height, properties, minHeight };
    }

    setLivePathAttributes(point, width, height) {
        this.liveElement.setAttribute("x", point.x);
        this.liveElement.setAttribute("y", point.y);
        this.liveElement.setAttribute("width", width);
        this.liveElement.setAttribute("height", height);
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
            line-height: ${TEXT_LINE_HEIGHT};
            font-family: '${properties.fontFamily.value}';
            overflow: hidden;
            letter-spacing: 0.00000001px;
            word-break: break-word;
        `;
        return textarea;
    }

    setupAutoGrow(point, minHeight, text, properties) {
        this.span = this.createHiddenSpan(text, properties);

        if (text) {
            // Defer size adjustment until textarea is rendered
            setTimeout(
                () => this.adjustTextareaSize(point, minHeight, properties),
                0
            );
        }

        const adjustSize = () =>
            this.adjustTextareaSize(point, minHeight, properties);
        const commitOnBlur = () => this.handleBlurCommit();

        this.textarea.addEventListener("input", adjustSize);
        this.textarea.addEventListener("blur", commitOnBlur);
    }

    createHiddenSpan(text, properties) {
        const span = document.createElement("span");
        Object.assign(span.style, {
            visibility: "hidden",
            position: "fixed",
            whiteSpace: "pre",
            fontFamily: properties.fontFamily.value,
            fontSize: `${properties.fontSize.value}px`,
        });
        span.textContent = text || " ";
        document.body.appendChild(span);
        return span;
    }

    adjustTextareaSize(point, minHeight, properties) {
        if (!this.textarea) return;
        this.textarea.style.height = "auto";
        const newHeight = Math.max(this.textarea.scrollHeight, minHeight);
        this.textarea.style.height = `${newHeight}px`;
        this.liveElement.setAttribute("height", newHeight);

        // Update span to measure text width
        this.span.style.fontSize = `${properties.fontSize.value}px`;
        this.span.textContent = this.textarea.value || " ";
        const measuredWidth = this.span.offsetWidth;

        // Get existing shape width if editing
        const existingWidth = this.shapeId
            ? shapeSlice.getSlice().shapes[this.shapeId].width
            : 0;

        // Compute final width using helper function
        const finalWidth = this.calculateTextareaWidth(
            measuredWidth,
            point,
            existingWidth
        );
        // save the final applied width
        this.currentTextareaWidth = finalWidth;

        // Apply
        this.textarea.style.width = `${finalWidth}px`;
        this.liveElement.setAttribute("width", finalWidth);
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
        this.createLiveElement("foreignObject");
        this.createTextInput(existing);
    }

    // Helper function to calculate max allowed width for text input
    calculateTextareaWidth(measuredTextWidth, point, existingShapeWidth = 0) {
        const canvasScale = canvasPropertiesSlice.getSlice().properties.scale;

        // Convert canvas to viewport point
        const viewportPoint = toViewportPoint(point);

        // Remaining viewport space in DOM pixels
        const remainingSpace = Math.max(
            (window.innerWidth - viewportPoint.x - PADDING_RIGHT) / canvasScale,
            MIN_TEXT_WIDTH
        );

        // Adjust buffer dynamically so we don't exceed viewport
        const buffer = Math.min(WIDTH_BUFFER, remainingSpace);

        // Compute target width: max of existing shape width or measured text width + buffer
        const baseWidth = Math.max(
            existingShapeWidth || MIN_TEXT_WIDTH,
            measuredTextWidth + buffer
        );

        // Clamp to max allowed width (cannot exceed viewport)
        return Math.min(baseWidth, remainingSpace);
    }
}
