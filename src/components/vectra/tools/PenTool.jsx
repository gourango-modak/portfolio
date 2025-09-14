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

    onPointerDown(event, { canvasSettings }) {
        // create a new polyline shape
        this.currentShape = new PolylineShape(
            {
                color: this.settings.color,
                minPoints: this.settings.minPoints,
                strokeWidth: this.settings.strokeWidth,
            },
            canvasSettings.artboard.currentPageId
        );
        // start with the first point
        this.currentShape.addPoint(event);

        if (this.currentShape.isValid()) {
            return { type: "createdShape", shape: this.currentShape };
        }
    }

    onPointerMove(event) {
        // Only draw if left button is pressed
        if (event.buttons & 1 && this.currentShape) {
            this.currentShape.addPoint(event);

            if (this.currentShape.isValid()) {
                return { type: "updatedShape", shape: this.currentShape };
            }
        }
    }

    onPointerUp() {
        const shape = this.currentShape;
        this.currentShape = null;

        if (shape?.isValid()) {
            shape.finalize();
            return { type: "finalizedShape", shape: shape };
        }
    }

    getIcon() {
        return <Pen size={20} />;
    }
}
