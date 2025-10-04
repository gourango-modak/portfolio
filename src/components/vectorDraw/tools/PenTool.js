import getStroke from "perfect-freehand";
import { useShapeStore } from "../store/useShapeStore";
import { CANVAS_MODES, getSvgPathFromStroke } from "../canvasUtils";
import { BaseTool } from "./BaseTool";
import { useCanvasStore } from "../store/useCanvasStore";

export class PenTool extends BaseTool {
    static name = "PEN";
    static label = "Pen Tool";
    static shapeType = PenTool.name;
    static shortcut = {
        code: "KeyP",
    };

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

        const canvasStore = useCanvasStore.getState();
        const shape = {
            type: PenTool.shapeType,
            points: this.points,
            strokePoints: this.getStrokePoints(),
            properties: { ...this.properties },
            bounds: this.getBounds(),
        };

        if (canvasStore.properties.mode.value === CANVAS_MODES.PAGED) {
            shape.frameId = canvasStore.activeFrameId;
        }

        useShapeStore.getState().addShape(shape);

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

    getBounds() {
        const xs = this.points.map((p) => p.x);
        const ys = this.points.map((p) => p.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const maxX = Math.max(...xs);
        const maxY = Math.max(...ys);
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    }
}
