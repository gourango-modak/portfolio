import { TextShape } from "../shapes/text/TextShape";
import { BaseTool } from "./BaseTool";
import { Minus } from "lucide-react";

export class TextTool extends BaseTool {
    constructor() {
        super("text");
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
    onPointerDown(event) {
        debugger;
        // Only block clicks if actually editing (not pending)
        if (this.editState === "editing") return null;

        const point = { x: event.x, y: event.y };
        this.currentShape = new TextShape({
            ...this.settings,
        });

        this.currentShape.setPosition(point);
        // Move into pending state (waiting for text input)
        this.editState = "pending";

        // Return a createShape event so Canvas can track currentShape
        return { type: "drawStart", shape: this.currentShape };
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
            return { type: "drawEnd", shape: finished };
        }

        return { type: "invalidShape", shape: finished };
    }

    getIcon() {
        return <Minus size={20} />;
    }
}
