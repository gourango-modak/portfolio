import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { getRoughArrowPath } from "../utils/svgUtils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";

export class ArrowTool extends BaseTool {
    static name = TOOLS.ARROW;
    static label = "Arrow Tool";
    static shortcut = { code: "KeyA" };

    // Default properties for the arrow
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
        this.startPoint = null; // Store the starting point of the arrow while drawing
    }

    onPointerDown(e) {
        // Record the start point when user begins drawing
        this.startPoint = { x: e.tx, y: e.ty };

        // Initialize the live arrow path for visual feedback
        this._createLiveArrow();
    }

    onPointerMove(e) {
        if (!this.startPoint || !this.livePath) return;

        const { x: x1, y: y1 } = this.startPoint;
        const x2 = e.tx;
        const y2 = e.ty;

        // Skip drawing if arrow is too short
        if (!this._isArrowLongEnough(x1, y1, x2, y2)) return;

        // Update the live arrow path dynamically as pointer moves
        this._updateLiveArrowPath(x1, y1, x2, y2);
    }

    onPointerUp(e) {
        if (!this.startPoint || !this.livePath) return;

        const { x: x1, y: y1 } = this.startPoint;
        const x2 = e.tx;
        const y2 = e.ty;

        // Skip creating arrow if it's too short
        if (!this._isArrowLongEnough(x1, y1, x2, y2)) {
            this.startPoint = null;
            this.cleanUp();
            return;
        }

        // Generate the final arrow shape with normalized points
        const shape = this._createArrowShape(x1, y1, x2, y2);

        // Add the arrow shape to the canvas or frame
        this._addShapeToCanvas(shape);

        // Reset for next drawing
        this.startPoint = null;
        this.cleanUp();
    }

    _createLiveArrow() {
        // Create an SVG path element for live drawing
        this.createLivePath();
        this.livePath.setAttribute("stroke", this.properties.color.value);
        this.livePath.setAttribute(
            "stroke-width",
            this.properties.strokeWidth.value
        );
        this.livePath.setAttribute("fill", "transparent");
    }

    _updateLiveArrowPath(x1, y1, x2, y2) {
        // Compute rough arrow path for live preview
        const pathData = getRoughArrowPath(x1, y1, x2, y2, this.properties);
        this.livePath.setAttribute("d", pathData);
    }

    _isArrowLongEnough(x1, y1, x2, y2, minLength = 25) {
        // Calculate the Euclidean distance between start and end points
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy) >= minLength;
    }

    _createArrowShape(x1, y1, x2, y2) {
        const { headLength, headAngle } = this.properties;

        // Angle of the main arrow line
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Convert arrowhead angle to radians
        const headRad = (headAngle.value * Math.PI) / 180;

        // Compute the two points of the arrowhead
        const hx1 = x2 - headLength.value * Math.cos(angle - headRad);
        const hy1 = y2 - headLength.value * Math.sin(angle - headRad);
        const hx2 = x2 - headLength.value * Math.cos(angle + headRad);
        const hy2 = y2 - headLength.value * Math.sin(angle + headRad);

        // All points of the arrow (line + head)
        const points = [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: hx1, y: hy1 },
            { x: hx2, y: hy2 },
        ];

        // Find top-left corner for normalization
        const minX = Math.min(...points.map((p) => p.x));
        const minY = Math.min(...points.map((p) => p.y));

        // Normalize points relative to top-left corner
        const normalizedPoints = points.map((p) => ({
            x: p.x - minX,
            y: p.y - minY,
        }));

        return {
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
    }

    _addShapeToCanvas(shape) {
        const { addShape } = shapeSlice.getSlice();
        const { activeFrameId } = frameSlice.getSlice();
        const canvasMode =
            canvasPropertiesSlice.getSlice().properties.mode.value;

        // Assign frameId if canvas is in paged mode
        if (canvasMode === CANVAS_MODES.PAGED) {
            shape.frameId = activeFrameId;
        }

        // Add the final arrow shape to the canvas state
        addShape(shape);
    }
}
