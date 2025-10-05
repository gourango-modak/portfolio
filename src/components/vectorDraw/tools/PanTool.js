import { useCanvasStore } from "../store/useCanvasStore";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./toolsUtils";

export class PanTool extends BaseTool {
    static name = TOOLS.PAN;
    static label = "Pan Tool";
    static shortcut = {
        code: "Space",
    };
    static revertOnRelease = true;
    static cursor = "grab";

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
        this.startPan = null;
    }

    onPointerDown(e) {
        const canvasStore = useCanvasStore.getState();
        this.startPoint = { x: e.clientX, y: e.clientY };
        this.startPan = { ...canvasStore.properties.pan };

        canvasStore.setCursor("grabbing");
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
        const canvasStore = useCanvasStore.getState();
        this.startPoint = null;
        this.startPan = null;
        canvasStore.setCursor(PanTool.cursor);
    }
}
