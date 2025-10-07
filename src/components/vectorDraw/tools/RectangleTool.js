import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";
import { getRoughRectPath } from "../utils/svgUtils";

export class RectangleTool extends BaseTool {
    static name = TOOLS.RECTANGLE;
    static label = "Rectangle Tool";
    static shortcut = {
        code: "KeyR",
    };

    // Default tool properties
    static defaultProperties = {
        color: {
            value: "#000",
            label: "Color",
            type: "color",
            id: "rectColor",
        },
        strokeWidth: {
            value: 2,
            label: "Stroke Width",
            type: "slider",
            min: 0,
            max: 15,
            step: 1,
        },
        roughness: {
            value: 3,
            label: "Roughness",
            type: "slider",
            min: 0,
            max: 15,
            step: 1,
        }, // 0 = clean
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
    }

    onPointerDown(e) {
        this.startPoint = { x: e.tx, y: e.ty };
        this.createLivePath();
        this.livePath.setAttribute("stroke", this.properties.color.value);
        this.livePath.setAttribute(
            "stroke-width",
            this.properties.strokeWidth.value
        );
        this.livePath.setAttribute("fill", "transparent");
    }

    onPointerMove(e) {
        if (!this.startPoint || !this.livePath) return;
        const { x, y, width, height } = this.getRectDimensions(e);
        this.livePath.setAttribute(
            "d",
            getRoughRectPath(
                x,
                y,
                width,
                height,
                this.properties.roughness.value
            )
        );
    }

    onPointerUp(e) {
        if (!this.startPoint || !this.livePath) return;
        const { x, y, width, height } = this.getRectDimensions(e);

        // Skip small rectangles
        if (width <= 20) {
            this.cleanUp();
            this.startPoint = null;
            return;
        }

        // Create a local (normalized) path starting from (0, 0)
        const pathData = getRoughRectPath(
            0,
            0,
            width,
            height,
            this.properties.roughness.value
        );

        const shape = {
            type: SHAPES.RECTANGLE,
            x,
            y,
            width,
            height,
            path: pathData,
            properties: { ...this.properties },
        };

        const { addShape } = shapeSlice.getSlice();
        const { activeFrameId } = frameSlice.getSlice();
        const canvasMode =
            canvasPropertiesSlice.getSlice().properties.mode.value;

        if (canvasMode === CANVAS_MODES.PAGED) {
            shape.frameId = activeFrameId;
        }

        addShape(shape);

        this.startPoint = null;
        this.seed = null;
        this.cleanUp();
    }

    getRectDimensions(e) {
        const x = Math.min(e.tx, this.startPoint.x);
        const y = Math.min(e.ty, this.startPoint.y);
        const width = Math.abs(e.tx - this.startPoint.x);
        const height = Math.abs(e.ty - this.startPoint.y);
        return { x, y, width, height };
    }
}
