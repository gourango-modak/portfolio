import { SHAPES } from "../shapes/constants";
import { shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";
import { getRoughRectPath } from "../utils/svgUtils";
import { resolveShapeFrameId } from "../utils/frameUtils";
import { TOOL_PROPERTIES } from "../toolbar/components/properties/constants";

export class RectangleTool extends BaseTool {
    static name = TOOLS.RECTANGLE;
    static label = "Rectangle Tool";
    static shortcut = {
        code: "KeyR",
    };
    static cursor = "crosshair";

    // Default tool properties
    static defaultProperties = {
        [TOOL_PROPERTIES.COLOR]: {
            value: "#000",
            label: "Color",
            id: "rectColor",
        },
        [TOOL_PROPERTIES.STROKE_WIDTH]: {
            value: 2,
            label: "Stroke Width",
            min: 0,
            max: 15,
            step: 1,
        },
        [TOOL_PROPERTIES.ROUGHNESS]: {
            value: 3,
            label: "Roughness",
            min: 0,
            max: 15,
            step: 1,
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
        this.seed = null; // Store seed for consistent roughness
    }

    onPointerDown(e) {
        this.startPoint = { x: e.tx, y: e.ty };
        this.createLiveElement();
        this.liveElement.setAttribute("stroke", this.properties.color.value);
        this.liveElement.setAttribute(
            "stroke-width",
            this.properties.strokeWidth.value
        );
        this.liveElement.setAttribute("fill", "transparent");
        this.seed = Math.floor(Math.random() * 1000000); // set seed
    }

    onPointerMove(e) {
        if (!this.startPoint || !this.liveElement) return;
        const { x, y, width, height } = this.getRectDimensions(e);
        this.liveElement.setAttribute(
            "d",
            getRoughRectPath(
                x,
                y,
                width,
                height,
                this.properties.roughness.value,
                this.properties.strokeWidth.value,
                this.seed
            )
        );
    }

    onPointerUp(e) {
        if (!this.startPoint || !this.liveElement) return;
        const { x, y, width, height } = this.getRectDimensions(e);

        // Skip small rectangles
        if (width <= 20) {
            this.cleanUp();
            this.startPoint = null;
            this.seed = null;
            return;
        }

        // Create a local (normalized) path starting from (0, 0)
        const pathData = getRoughRectPath(
            0,
            0,
            width,
            height,
            this.properties.roughness.value,
            this.properties.strokeWidth.value,
            this.seed
        );

        const shape = {
            type: SHAPES.RECTANGLE,
            x,
            y,
            width,
            height,
            path: pathData,
            seed: this.seed,
            properties: { ...this.properties },
        };

        shape.frameId = resolveShapeFrameId(shape);
        shapeSlice.getSlice().addShape(shape);
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
        this.seed = null;
        super.cleanUp();
    }
}
