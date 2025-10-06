import { canvasPropertiesSlice } from "../store/storeUtils";
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
        const {
            properties: { pan },
            setCursor,
        } = canvasPropertiesSlice.getSlice();

        this.startPoint = { x: e.clientX, y: e.clientY };
        this.startPan = { ...pan };

        setCursor("grabbing");
    }

    onPointerMove(e) {
        if (!this.startPoint || !this.startPan) return;

        const dx = e.clientX - this.startPoint.x;
        const dy = e.clientY - this.startPoint.y;

        const { setPan } = canvasPropertiesSlice.getSlice();
        setPan({
            x: this.startPan.x + dx,
            y: this.startPan.y + dy,
        });
    }

    onPointerUp(e) {
        const { setCursor } = canvasPropertiesSlice.getSlice();
        setCursor(PanTool.cursor);

        this.startPoint = null;
        this.startPan = null;
    }
}
