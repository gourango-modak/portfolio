import { TextShape } from "../shapes/text/TextShape";
import { BaseTool } from "./BaseTool";
import { Minus } from "lucide-react";
import { TOOLS } from "./toolUtils";

export class TextTool extends BaseTool {
    constructor() {
        super(TOOLS.TEXT.NAME, TOOLS.TEXT.LABEL);
        this.currentShape = null;
        this.editState = "idle"; // idle | pending | editing
    }

    defaultSettings() {
        return {
            color: "#000",
            fontSize: 16,
            fontFamily: "Arial",
        };
    }

    // On pointer down, create a new TextShape at the click position
    onPointerDown(event, { canvasSettings }) {
        // Only block clicks if actually editing (not pending)
        if (this.editState === "editing") return null;

        const point = { x: event.x, y: event.y, lx: event.lx, ly: event.ly };
        this.currentShape = new TextShape(
            {
                ...this.settings,
            },
            canvasSettings.artboard.currentPageId
        );

        this.currentShape.setPosition(point);
        // Move into pending state (waiting for text input)
        this.editState = "pending";

        // Return a createShape event so Canvas can track currentShape
        return { type: "createdShape", shape: this.currentShape };
    }

    setText(text) {
        if (this.currentShape) {
            this.currentShape.setText(text);

            // Once text is non-empty, consider it "editing"
            if (text && text.trim() !== "") {
                this.editState = "editing";
            }
        }
    }

    // Called explicitly from overlay when user finishes typing
    finalizeText() {
        if (!this.currentShape) return null;
        const finished = this.currentShape;
        this.currentShape = null;
        // Reset state
        this.editState = "idle";

        if (finished.text != "") {
            return { type: "finalizedShape", shape: finished };
        } else {
            return { type: "resetCurrentShape" };
        }
    }

    getIcon() {
        return <Minus size={20} />;
    }
}
