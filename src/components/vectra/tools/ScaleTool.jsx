import { BaseTool } from "./BaseTool";

export class ScaleTool extends BaseTool {
    constructor() {
        super("scale");
        this.shortcut = { alt: true };
        this.revertOnRelease = true;
    }

    show() {
        return false; // hidden in toolbar
    }

    defaultSettings() {
        return {
            zoomFactor: 1.1,
            minScale: 0.2,
            maxScale: 5,
        };
    }

    onWheel(event, { canvasSettings }) {
        const scale = canvasSettings.scale;
        const pan = canvasSettings.pan;
        const { zoomFactor, minScale, maxScale } = this.settings;

        const direction = event.deltaY < 0 ? 1 : -1;
        const newScale = Math.min(
            Math.max(
                scale * (direction > 0 ? zoomFactor : 1 / zoomFactor),
                minScale
            ),
            maxScale
        );

        // Mouse pointer in screen coordinates
        const anchor = { x: event.lx, y: event.ly };

        // Compute new pan to keep anchor point fixed
        const newPan = {
            x: anchor.x - (anchor.x - pan.x) * (newScale / scale),
            y: anchor.y - (anchor.y - pan.y) * (newScale / scale),
        };

        return {
            type: "scale",
            scale: newScale,
            pan: newPan,
        };
    }
}
