import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { getRoughArrowPath } from "../svgUtils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";

export class ArrowTool extends BaseTool {
    static name = TOOLS.ARROW;
    static label = "Arrow Tool";
    static shortcut = { code: "KeyA" };

    static defaultProperties = {
        color: {
            value: "#000",
            label: "Color",
            type: "color",
            id: "arrowColor",
        },
        strokeWidth: {
            value: 2,
            label: "Stroke Width",
            type: "slider",
            min: 1,
            max: 10,
            step: 1,
        },
        roughness: {
            value: 1.75,
            label: "Roughness",
            type: "slider",
            min: 0,
            max: 4,
            step: 0.25,
        },
        headLength: {
            value: 25,
            label: "Arrow Head Length",
            min: 5,
            max: 50,
            step: 1,
        },
        headAngle: {
            value: 30,
            label: "Arrow Head Angle",
            min: 10,
            max: 90,
            step: 1,
        },
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

        const x1 = this.startPoint.x;
        const y1 = this.startPoint.y;
        const x2 = e.tx;
        const y2 = e.ty;

        if (!this._isValidArrow(x1, y1, x2, y2, 25)) return;

        const pathData = getRoughArrowPath(x1, y1, x2, y2, this.properties);
        this.livePath.setAttribute("d", pathData);
    }

    onPointerUp(e) {
        if (!this.startPoint || !this.livePath) return;

        const x1 = this.startPoint.x;
        const y1 = this.startPoint.y;
        const x2 = e.tx;
        const y2 = e.ty;

        if (!this._isValidArrow(x1, y1, x2, y2, 25)) {
            this.startPoint = null;
            this.cleanUp();
            return; // Skip creating tiny arrows
        }

        // Compute arrowhead points
        const headLength = this.properties.headLength?.value;
        const headAngle = (this.properties.headAngle?.value * Math.PI) / 180;
        const angle = Math.atan2(y2 - y1, x2 - x1);

        const hx1 = x2 - headLength * Math.cos(angle - headAngle);
        const hy1 = y2 - headLength * Math.sin(angle - headAngle);

        const hx2 = x2 - headLength * Math.cos(angle + headAngle);
        const hy2 = y2 - headLength * Math.sin(angle + headAngle);

        const allPoints = [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: hx1, y: hy1 },
            { x: hx2, y: hy2 },
        ];

        const xs = allPoints.map((p) => p.x);
        const ys = allPoints.map((p) => p.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);

        const normalizedPoints = allPoints.map((p) => ({
            x: p.x - minX,
            y: p.y - minY,
        }));

        const shape = {
            type: SHAPES.ARROW,
            points: normalizedPoints,
            properties: { ...this.properties },
            x: minX,
            y: minY,
            path: getRoughArrowPath(
                normalizedPoints[0].x,
                normalizedPoints[0].y,
                normalizedPoints[1].x,
                normalizedPoints[1].y,
                this.properties
            ),
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
        this.cleanUp();
    }

    // returns true if arrow is long enough
    _isValidArrow(x1, y1, x2, y2, minLength = 25) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        return length >= minLength;
    }
}
