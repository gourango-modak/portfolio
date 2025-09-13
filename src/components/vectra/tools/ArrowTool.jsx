import { ArrowUpRight } from "lucide-react";
import { ArrowShape } from "../shapes/line/ArrowShape";
import { BaseTool } from "./BaseTool";

export class ArrowTool extends BaseTool {
    constructor() {
        super("arrow");
        this.shortcut = {
            code: "KeyA",
        };
    }

    defaultSettings() {
        return {
            color: "#000",
            strokeWidth: 2,
            arrowHeadSize: 10,
            minLength: 20,
        };
    }

    onPointerDown(event, { canvasSettings }) {
        this.currentShape = new ArrowShape({
            color: this.settings.color,
            strokeWidth: this.settings.strokeWidth,
            arrowHeadSize: this.settings.arrowHeadSize,
            minLength: this.settings.minLength,
            page: canvasSettings.artboard.currentPageIndex,
        });
        this.currentShape.setPoints(event, event); // start = end initially

        if (this.currentShape.isValid()) {
            return { type: "createdShape", shape: this.currentShape };
        }
    }

    onPointerMove(event) {
        if (this.currentShape) {
            this.currentShape.setPoints(this.currentShape.start, event);

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
        return <ArrowUpRight size={20} />;
    }
}
