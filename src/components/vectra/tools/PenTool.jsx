import { Pen } from "lucide-react"; // or any icon you prefer
import { BaseTool } from "./BaseTool";
import { PolylineShape } from "../shapes/polyline/PolylineShape";

export class PenTool extends BaseTool {
    constructor() {
        super("pen"); // tool name
        this.shortcut = {
            code: "KeyP", // 'Z'
        };
    }

    defaultSettings() {
        return {
            color: "#000",
            minPoints: 2, // minimum points to consider a valid line
            strokeWidth: 16,
        };
    }

    onPointerDown(event) {
        // create a new polyline shape
        this.currentShape = new PolylineShape({
            color: this.settings.color,
            minPoints: this.settings.minPoints,
            strokeWidth: this.settings.strokeWidth,
        });
        // start with the first point
        this.currentShape.addPoint(event);

        // Emit event only if valid
        if (this.currentShape.isValid()) {
            return { type: "drawStart", shape: this.currentShape };
        }

        // Emit special event
        return { type: "invalidShape", shape: this.currentShape };
    }

    onPointerMove(event) {
        // Only draw if left button is pressed
        if (event.buttons & 1 && this.currentShape) {
            this.currentShape.addPoint(event);

            if (this.currentShape.isValid()) {
                return { type: "drawProgress", shape: this.currentShape };
            }
        }
        return { type: "invalidShape", shape: this.currentShape };
    }

    onPointerUp() {
        const shape = this.currentShape;
        this.currentShape = null;

        if (shape?.isValid()) {
            shape.finalize();
            return { type: "drawEnd", shape: shape };
        }

        return { type: "invalidShape", shape: shape };
    }

    getIcon() {
        return <Pen size={20} />;
    }
}
