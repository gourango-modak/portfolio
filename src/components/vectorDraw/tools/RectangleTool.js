import { useShapeStore } from "../store/useShapeStore";
import { BaseTool } from "./BaseTool";

export class RectangleTool extends BaseTool {
    static name = "RECT";
    static label = "Rectangle Tool";
    static shapeType = RectangleTool.name;
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
        this.livePath.setAttribute("d", this.getPathData(x, y, width, height));
    }

    onPointerUp(e) {
        if (!this.startPoint || !this.livePath) return;
        const { x, y, width, height } = this.getRectDimensions(e);
        const pathData = this.getPathData(x, y, width, height);

        useShapeStore.getState().addShape({
            type: RectangleTool.shapeType,
            x,
            y,
            width,
            height,
            path: pathData,
            properties: { ...this.properties },
        });

        this.startPoint = null;
        this.cleanUp();
    }

    getRectDimensions(e) {
        const x = Math.min(e.tx, this.startPoint.x);
        const y = Math.min(e.ty, this.startPoint.y);
        const width = Math.abs(e.tx - this.startPoint.x);
        const height = Math.abs(e.ty - this.startPoint.y);
        return { x, y, width, height };
    }

    getPathData(x, y, width, height) {
        return this.generateRoughRectPath(
            x,
            y,
            width,
            height,
            this.properties.roughness.value
        );
    }

    generateRoughRectPath(x, y, w, h, roughness = 0) {
        const jitter = (v) => v + (Math.random() - 0.5) * roughness;

        const makePath = () => {
            const x1 = jitter(x),
                y1 = jitter(y);
            const x2 = jitter(x + w),
                y2 = jitter(y);
            const x3 = jitter(x + w),
                y3 = jitter(y + h);
            const x4 = jitter(x),
                y4 = jitter(y + h);
            return `M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z`;
        };

        return roughness > 0
            ? `${makePath()} ${makePath()}`
            : `M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`;
    }
}
