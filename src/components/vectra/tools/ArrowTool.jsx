// tools/ArrowTool.js
import { ArrowUpRight } from "lucide-react";
import { ArrowShape } from "../shapes/line/ArrowShape";
import { BaseTool } from "./BaseTool";

export class ArrowTool extends BaseTool {
    constructor() {
        super("arrow");
    }

    defaultSettings() {
        return {
            color: "#000",
            strokeWidth: 2,
            arrowHeadSize: 10,
            minLength: 20,
        };
    }

    onPointerDown(event) {
        this.currentShape = new ArrowShape({
            color: this.settings.color,
            strokeWidth: this.settings.strokeWidth,
            arrowHeadSize: this.settings.arrowHeadSize,
            minLength: this.settings.minLength,
        });
        this.currentShape.setPoints(event, event); // start = end initially

        // Emit event only if valid
        if (this.currentShape.isValid()) {
            return { type: "drawStart", shape: this.currentShape };
        }

        // Emit special event
        return { type: "invalidShape", shape: this.currentShape };
    }

    onPointerMove(event) {
        if (this.currentShape) {
            this.currentShape.setPoints(this.currentShape.start, event);

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
        return <ArrowUpRight size={20} />;
    }
}
