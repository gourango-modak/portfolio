import { LineShape } from "../shapes/line/LineShape";
import { BaseTool } from "./BaseTool";
import { Minus } from "lucide-react";

export class LineTool extends BaseTool {
    constructor() {
        super("line", "Line");
    }

    defaultSettings() {
        return { color: "#000", strokeWidth: 2, minLength: 20 };
    }

    onPointerDown(event, { canvasSettings }) {
        const point = { x: event.x, y: event.y };
        this.currentShape = new LineShape(
            {
                color: this.settings.color,
                strokeWidth: this.settings.strokeWidth,
                minLength: this.settings.minLength,
            },
            canvasSettings.artboard.currentPageId
        );

        this.currentShape.setPoints(point, point);

        if (this.currentShape.isValid()) {
            return { type: "createdShape", shape: this.currentShape };
        }
    }

    onPointerMove(event) {
        const point = { x: event.x, y: event.y };

        if (this.currentShape) {
            this.currentShape.setPoints(this.currentShape.start, point);

            if (this.currentShape.isValid()) {
                return { type: "updatedShape", shape: this.currentShape };
            }
        }
    }

    onPointerUp() {
        const shape = this.currentShape;
        this.currentShape = null;

        if (shape?.isValid()) {
            return { type: "finalizedShape", shape: shape };
        }
    }

    getIcon() {
        return <Minus size={20} />;
    }
}
