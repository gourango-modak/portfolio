import { BaseTool } from "./BaseTool";

export class PanTool extends BaseTool {
    constructor() {
        super("pan");
        this.shortcut = { code: "Space" }; // activate via Spacebar
        this.isDragging = false;
        this.start = null;
        this.startPan = null;
        this.revertOnRelease = true;
    }

    show() {
        return false; // hidden in toolbar
    }

    defaultSettings() {
        return {
            sensitivity: 1, // multiplier for panning speed
        };
    }

    onPointerDown(event, { canvasSettings }) {
        this.isDragging = true;
        this.start = { x: event.lx, y: event.ly };
        this.startPan = { ...canvasSettings.pan };
        return null; // no shape creation
    }

    onPointerMove(event) {
        if (!this.isDragging || !this.start) return null;

        const dx = (event.lx - this.start.x) * this.settings.sensitivity;
        const dy = (event.ly - this.start.y) * this.settings.sensitivity;

        const newPan = {
            x: this.startPan.x + dx,
            y: this.startPan.y + dy,
        };

        return { type: "pan", pan: newPan };
    }

    onPointerUp() {
        this.isDragging = false;
        this.start = null;
        this.startPan = null;
        return null;
    }
}
