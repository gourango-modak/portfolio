import { SELECTION_RECT_PADDING } from "../components/SelectionOutlineLayer/constants";
import { SHAPES } from "../shapes/constants";
import { frameSlice, shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TEXT_LINE_HEIGHT, TOOLS } from "./constants";

const DEFAULT_TITLE = "Frame";
const TITLE_FONT_SIZE = 12;
const TITLE_FONT_FAMILY = "Arial";
const TITLE_WIDTH = TITLE_FONT_SIZE * 4;
const TITLE_TOP_FROM_FRAME = 3.5 * SELECTION_RECT_PADDING;
const MIN_FRAME_SIZE = 5;

export class FrameTool extends BaseTool {
    static name = TOOLS.FRAME;
    static label = "Frame Tool";
    static shortcut = { code: "KeyF" };
    static cursor = "crosshair";

    static defaultProperties = {
        borderColor: {
            value: "rgba(0,0,0,0.2)",
            label: "Border Color",
            type: "color",
            id: "frameBorderColor",
        },
        strokeWidth: {
            value: 2,
            label: "Border Width",
            type: "slider",
            min: 0,
            max: 15,
            step: 1,
        },
        bgColor: {
            value: "transparent",
            label: "Fill Color",
            type: "color",
            id: "frameFillColor",
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
        this.liveTitleElement = null;
    }

    // Helper to create live preview title
    createLiveTitleElement({ x, y }, text = DEFAULT_TITLE) {
        const foreignObj = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "foreignObject"
        );

        foreignObj.setAttribute("x", x);
        foreignObj.setAttribute("y", y - TITLE_TOP_FROM_FRAME);
        foreignObj.setAttribute("width", TITLE_WIDTH);
        foreignObj.setAttribute("height", TITLE_FONT_SIZE * TEXT_LINE_HEIGHT);
        foreignObj.setAttribute("pointer-events", "none");

        const div = document.createElement("div");
        div.style.color = this.properties.borderColor.value;
        div.style.fontSize = `${TITLE_FONT_SIZE}px`;
        div.style.fontFamily = TITLE_FONT_FAMILY;
        div.style.userSelect = "none";
        div.style.pointerEvents = "none";
        div.style.whiteSpace = "nowrap";
        div.style.lineHeight = TEXT_LINE_HEIGHT;
        div.textContent = text;

        foreignObj.appendChild(div);
        return foreignObj;
    }

    createTitleShape(x, y, text = DEFAULT_TITLE) {
        return {
            type: SHAPES.TEXT,
            x,
            y: y - TITLE_TOP_FROM_FRAME,
            width: TITLE_WIDTH,
            height: TITLE_FONT_SIZE * TEXT_LINE_HEIGHT,
            text,
            properties: {
                color: { value: this.properties.borderColor.value },
                fontSize: { value: TITLE_FONT_SIZE },
                fontFamily: { value: TITLE_FONT_FAMILY },
            },
            isEditing: false,
            locked: true,
        };
    }

    onPointerDown(e) {
        this.startPoint = { x: e.tx, y: e.ty };
        this.createLiveElement("rect");
        this.liveElement.setAttribute(
            "stroke",
            this.properties.borderColor.value
        );
        this.liveElement.setAttribute(
            "stroke-width",
            this.properties.strokeWidth.value
        );
        this.liveElement.setAttribute("fill", this.properties.bgColor.value);

        this.liveTitleElement = this.createLiveTitleElement(this.startPoint);
        this.liveLayerRef.current.appendChild(this.liveTitleElement);
    }

    onPointerMove(e) {
        if (!this.startPoint) return;
        const { x, y, width, height } = this.getRectDimensions(e);
        this.liveElement.setAttribute("x", x);
        this.liveElement.setAttribute("y", y);
        this.liveElement.setAttribute("width", width);
        this.liveElement.setAttribute("height", height);
    }

    onPointerUp(e) {
        if (!this.startPoint) return;
        const { x, y, width, height } = this.getRectDimensions(e);

        if (width <= MIN_FRAME_SIZE || height <= MIN_FRAME_SIZE) {
            this.cleanUp();
            return;
        }

        const frame = {
            type: "FRAME",
            x,
            y,
            width: { value: width, label: "Width", type: "numeric" },
            height: { value: height, label: "Height", type: "numeric" },
            ...this.properties,
        };

        const frameId = frameSlice.getSlice().addFrame(frame);

        const titleShape = this.createTitleShape(
            this.startPoint.x,
            this.startPoint.y
        );
        const titleShapeId = shapeSlice.getSlice().addShape(titleShape);
        frameSlice.getSlice().updateFrame(frameId, { titleShapeId });

        this.cleanUp();
    }

    getRectDimensions(e) {
        const x = Math.min(e.tx, this.startPoint.x);
        const y = Math.min(e.ty, this.startPoint.y);
        const width = Math.abs(e.tx - this.startPoint.x);
        const height = Math.abs(e.ty - this.startPoint.y);
        return { x, y, width, height };
    }

    cleanUp() {
        this.liveTitleElement?.remove?.();
        this.liveTitleElement = null;
        this.startPoint = null;
        super.cleanUp();
    }
}
