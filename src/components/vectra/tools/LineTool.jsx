import { LineShape } from "../shapes/line/LineShape";
import { BaseTool } from "./BaseTool";
import { Minus } from "lucide-react";

export class LineTool extends BaseTool {
    constructor() {
        super("line");
    }

    defaultSettings() {
        return { color: "#000", strokeWidth: 2, minLength: 20 };
    }

    onPointerDown(event) {
        const point = { x: event.x, y: event.y };
        this.currentShape = new LineShape({
            color: this.settings.color,
            strokeWidth: this.settings.strokeWidth,
            minLength: this.settings.minLength,
        });

        this.currentShape.setPoints(point, point); // start = end initially
        // Emit event only if valid
        if (this.currentShape.isValid()) {
            return { type: "drawStart", shape: this.currentShape };
        }

        // Emit special event
        return { type: "invalidShape", shape: this.currentShape };
    }

    onPointerMove(event) {
        const point = { x: event.x, y: event.y };

        if (this.currentShape) {
            this.currentShape.setPoints(this.currentShape.start, point);

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
            return { type: "drawEnd", shape: shape };
        }

        return { type: "invalidShape", shape: shape };
    }

    getIcon() {
        return <Minus size={20} />;
    }
}
