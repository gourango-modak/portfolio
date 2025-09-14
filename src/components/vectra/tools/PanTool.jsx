import { BaseTool } from "./BaseTool";
import { TOOLS } from "./toolUtils";

export class PanTool extends BaseTool {
    constructor() {
        super(TOOLS.PAN.NAME, TOOLS.PAN.LABEL);
        this.shortcut = { code: "Space" };
        this.isDragging = false;
        this.start = null;
        this.startPan = null;
        this.revertOnRelease = true;
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
        return null;
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
    }
}
