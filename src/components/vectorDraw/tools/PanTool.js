import { useCanvasStore } from "../store/useCanvasStore";
import { BaseTool } from "./BaseTool";

export class PanTool extends BaseTool {
    static name = "PAN";
    static label = "Pan Tool";
    static shortcut = {
        code: "Space",
    };
    static revertOnRelease = true;
    static cursor = "grab";
    static cursorDragging = "grabbing";

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
        this.startPan = null;
    }

    onPointerDown(e) {
        const canvasStore = useCanvasStore.getState();
        this.startPoint = { x: e.clientX, y: e.clientY };
        this.startPan = { ...canvasStore.properties.pan };
    }

    onPointerMove(e) {
        if (!this.startPoint || !this.startPan) return;

        const dx = e.clientX - this.startPoint.x;
        const dy = e.clientY - this.startPoint.y;

        const canvasStore = useCanvasStore.getState();
        canvasStore.setPan({
            x: this.startPan.x + dx,
            y: this.startPan.y + dy,
        });
    }

    onPointerUp(e) {
        this.startPoint = null;
        this.startPan = null;
    }
}
