import { SHAPES } from "../shapes/constants";
import { frameSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";

export class FrameTool extends BaseTool {
    static name = TOOLS.FRAME;
    static label = "Frame Tool";
    static shortcut = {
        code: "KeyF",
    };
    static cursor = "crosshair";

    // Default tool properties
    static defaultProperties = {
        borderColor: {
            value: "#000",
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

        if (width <= 5 || height <= 5) {
            this.cleanUp();
            return;
        }

        const frame = {
            type: "FRAME",
            x,
            y,
            width: {
                value: width,
                label: "Width",
                type: "numeric",
            },
            height: {
                value: height,
                label: "Height",
                type: "numeric",
            },
            ...this.properties,
        };

        const { addFrame } = frameSlice.getSlice();
        addFrame(frame);

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
        this.startPoint = null;
        super.cleanUp();
    }
}
