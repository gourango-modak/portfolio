import getStroke from "perfect-freehand";
import { BaseTool } from "./BaseTool";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { TOOLS } from "./constants";
import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { getSvgPathFromStroke } from "../utils/svgUtils";

export class PenTool extends BaseTool {
    static name = TOOLS.PEN;
    static label = "Pen Tool";
    static shortcut = {
        code: "KeyP",
    };
    static cursor = "crosshair";

    // Default tool properties
    static defaultProperties = {
        color: { value: "#000", label: "Color", type: "color", id: "penColor" },
        strokeWidth: { value: 16, label: "Stroke Width", type: "slider" },
        streamline: {
            value: 0.5,
            label: "Streamline",
            type: "slider",
            min: 0,
            max: 1,
            step: 0.1,
        },
        thinning: {
            value: 0,
            label: "Thinning",
            type: "slider",
            min: -1,
            max: 1,
            step: 0.1,
        },
        smoothing: {
            value: 0.5,
            label: "Smoothing",
            type: "slider",
            min: 0,
            max: 1,
            step: 0.1,
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.points = [];
    }

    onPointerDown(e) {
        this.points = [{ x: e.tx, y: e.ty, pressure: e.pressure }];
        this.createLivePath();
        this.livePath.setAttribute("fill", this.properties.color.value);
    }

    onPointerMove(e) {
        if (!this.livePath) return;
        this.points.push({ x: e.tx, y: e.ty, pressure: e.pressure });
        this.livePath.setAttribute("d", this.getPathFromStrokePoints());
    }

    onPointerUp() {
        if (!this.livePath) return;

        // Compute stroke points
        const strokePoints = this.getStrokePoints();

        // Compute the bounding box of the stroke
        const xs = this.points.map((p) => p.x);
        const ys = this.points.map((p) => p.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);

        // Normalize points to local space (so shape.x/y become the transform)
        const normalizedPoints = this.points.map((p) => ({
            x: p.x - minX,
            y: p.y - minY,
            pressure: p.pressure,
        }));

        const normalizedStrokePoints = strokePoints.map(([x, y]) => [
            x - minX,
            y - minY,
        ]);

        const shape = {
            type: SHAPES.PEN,
            points: normalizedPoints,
            strokePoints: normalizedStrokePoints,
            properties: { ...this.properties },
            x: minX,
            y: minY,
        };

        const { addShape } = shapeSlice.getSlice();
        const { activeFrameId } = frameSlice.getSlice();
        const canvasMode =
            canvasPropertiesSlice.getSlice().properties.mode.value;

        if (canvasMode === CANVAS_MODES.PAGED) {
            shape.frameId = activeFrameId;
        }

        addShape(shape);

        this.points = [];
        this.cleanUp();
    }

    getStrokePoints() {
        return getStroke(this.points, {
            size: this.properties.strokeWidth.value,
            thinning: this.properties.thinning.value,
            smoothing: this.properties.smoothing.value,
            streamline: this.properties.streamline.value,
        });
    }

    getPathFromStrokePoints() {
        return getSvgPathFromStroke(this.getStrokePoints());
    }
}
