import { frameSlice, shapeSlice } from "../store/utils";
import { TOOL_PROPERTIES } from "../toolbar/components/properties/constants";
import {
    createFrameTitleShape,
    DEFAULT_FRAME_TITLE,
    FRAME_TITLE_FONT_FAMILY,
    FRAME_TITLE_FONT_SIZE,
    FRAME_TITLE_OFFSET_Y,
    FRAME_TITLE_WIDTH,
} from "../utils/frameUtils";
import { BaseTool } from "./BaseTool";
import { TEXT_LINE_HEIGHT, TOOLS } from "./constants";

const MIN_FRAME_SIZE = 50;
export class FrameTool extends BaseTool {
    static name = TOOLS.FRAME;
    static label = "Frame Tool";
    static shortcut = { code: "KeyF" };
    static cursor = "crosshair";

    static defaultProperties = {
        [TOOL_PROPERTIES.BORDER_COLOR]: {
            value: "#00000033",
            label: "Border Color",
            id: "frameBorderColor",
        },
        [TOOL_PROPERTIES.STROKE_WIDTH]: {
            value: 1.5,
            label: "Border Width",
            min: 0,
            max: 15,
            step: 1,
        },
        [TOOL_PROPERTIES.BG_COLOR]: {
            value: "transparent",
            label: "Background",
            id: "frameFillColor",
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
        this.liveTitleElement = null;
    }

    // Helper to create live preview title
    createLiveTitleElement({ x, y }, text = DEFAULT_FRAME_TITLE) {
        const foreignObj = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "foreignObject"
        );

        foreignObj.setAttribute("x", x);
        foreignObj.setAttribute("y", y - FRAME_TITLE_OFFSET_Y);
        foreignObj.setAttribute("width", FRAME_TITLE_WIDTH);
        foreignObj.setAttribute(
            "height",
            FRAME_TITLE_FONT_SIZE * TEXT_LINE_HEIGHT
        );
        foreignObj.setAttribute("pointer-events", "none");

        const div = document.createElement("div");
        div.style.color = this.properties.borderColor.value;
        div.style.fontSize = `${FRAME_TITLE_FONT_SIZE}px`;
        div.style.fontFamily = FRAME_TITLE_FONT_FAMILY;
        div.style.userSelect = "none";
        div.style.pointerEvents = "none";
        div.style.whiteSpace = "nowrap";
        div.style.lineHeight = TEXT_LINE_HEIGHT;
        div.textContent = text;

        foreignObj.appendChild(div);
        return foreignObj;
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
            width,
            height,
            properties: {
                ...this.properties,
                width: { value: width, label: "Width", type: "numeric" },
                height: { value: height, label: "Height", type: "numeric" },
            },
        };

        const frameId = frameSlice.getSlice().addFrame(frame);

        const titleShape = createFrameTitleShape({
            ...this.startPoint,
            color: this.properties.borderColor.value,
        });
        titleShape.frameId = frameId;
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
