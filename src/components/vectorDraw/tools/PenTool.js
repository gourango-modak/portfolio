import getStroke from "perfect-freehand";
import { BaseTool } from "./BaseTool";
import { shapeSlice } from "../store/utils";
import { TOOLS } from "./constants";
import { SHAPES } from "../shapes/constants";
import { getSvgPathFromStroke } from "../utils/svgUtils";
import { computePenBoundingBox } from "../boundingBox/penBoundingBox";
import { resolveShapeFrameId } from "../utils/frameUtils";

export class PenTool extends BaseTool {
    static name = TOOLS.PEN;
    static label = "Pen Tool";
    static shortcut = { code: "KeyP" };
    static cursor = "crosshair";

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
        this.rawPoints = [];
    }

    onPointerDown(event) {
        this.rawPoints = [this.createPoint(event)];
        this.createLiveElement();
        this.liveElement.setAttribute("fill", this.properties.color.value);
    }

    onPointerMove(event) {
        if (!this.liveElement) return;
        this.rawPoints.push(this.createPoint(event));
        this.updateLivePath();
    }

    onPointerUp() {
        if (!this.liveElement || this.rawPoints.length === 0) return;

        const penShape = this.createPenShape(this.rawPoints);

        this.addShapeToCanvas(penShape);

        this.rawPoints = [];
        this.cleanUp();
    }

    createPoint({ tx, ty, pressure }) {
        return { x: tx, y: ty, pressure };
    }

    getStrokePoints() {
        const { strokeWidth, thinning, smoothing, streamline } =
            this.properties;
        return getStroke(this.rawPoints, {
            size: strokeWidth.value,
            thinning: thinning.value,
            smoothing: smoothing.value,
            streamline: streamline.value,
        });
    }

    getPathFromStrokePoints() {
        return getSvgPathFromStroke(this.getStrokePoints());
    }

    updateLivePath() {
        this.liveElement.setAttribute("d", this.getPathFromStrokePoints());
    }

    createPenShape(points) {
        const { normalizedPoints, minX, minY } = this.normalizePoints(points);
        const shape = {
            type: SHAPES.PEN,
            points: normalizedPoints,
            properties: { ...this.properties },
            x: minX,
            y: minY,
        };

        const { width, height } = computePenBoundingBox(shape);
        shape.width = width;
        shape.height = height;

        return shape;
    }

    normalizePoints(points) {
        const xs = points.map((p) => p.x);
        const ys = points.map((p) => p.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);

        const normalizedPoints = points.map((p) => ({
            x: p.x - minX,
            y: p.y - minY,
            pressure: p.pressure,
        }));

        return { normalizedPoints, minX, minY };
    }

    addShapeToCanvas(shape) {
        shape.frameId = resolveShapeFrameId(shape);
        shapeSlice.getSlice().addShape(shape);
    }
}
