// tools/EraserTool.js
import { Eraser } from "lucide-react"; // Icon for toolbar
import { BaseTool } from "./BaseTool";

export class EraserTool extends BaseTool {
    constructor() {
        super("eraser");
    }

    defaultSettings() {
        return {
            radius: 10, // how far from pointer to erase shapes
        };
    }

    onPointerDown(event, shapes) {
        return {
            type: "erase",
            point: { x: event.x, y: event.y },
            radius: this.settings.radius,
        };
    }

    onPointerMove(event, shapes) {
        // Only draw if left button is pressed
        if (event.buttons & 1) {
            return {
                type: "erase",
                point: { x: event.x, y: event.y },
                radius: this.settings.radius,
            };
        }
    }

    onPointerUp() {
        return null;
    }

    getIcon() {
        return <Eraser size={20} />;
    }
}
