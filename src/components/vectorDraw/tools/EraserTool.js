import { shapeHitTestRegistry } from "../shapes/shapeHitTestRegistry";
import { useShapeStore } from "../store/useShapeStore";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./toolsUtils";

export class EraserTool extends BaseTool {
    static name = TOOLS.ERASER;
    static label = "Eraser Tool";
    static shortcut = { code: "KeyE" };

    static defaultProperties = {
        size: {
            value: 20,
            label: "Eraser Size",
            type: "slider",
            min: 5,
            max: 100,
            step: 1,
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.isErasing = false;

        // Create preview circle for eraser
        this.previewCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        this.previewCircle.setAttribute("fill", "rgba(0,0,0,0.1)");
        this.previewCircle.setAttribute("stroke", "#000");
        this.previewCircle.setAttribute("stroke-width", "1");
        this.previewCircle.style.pointerEvents = "none"; // ignore pointer
        this.liveLayerRef.current.appendChild(this.previewCircle);
        this.hidePreview();
    }

    showPreview(x, y) {
        const r = this.properties.size.value / 2;
        this.previewCircle.setAttribute("cx", x);
        this.previewCircle.setAttribute("cy", y);
        this.previewCircle.setAttribute("r", r);
        this.previewCircle.style.display = "block";
    }

    hidePreview() {
        this.previewCircle.style.display = "none";
    }

    onPointerDown(e) {
        this.isErasing = true;
        this.showPreview(e.tx, e.ty);
        this.eraseAt(e.tx, e.ty);
    }

    onPointerMove(e) {
        if (!this.isErasing) return;
        this.showPreview(e.tx, e.ty);
        this.eraseAt(e.tx, e.ty);
    }

    onPointerUp(e) {
        this.isErasing = false;
        this.hidePreview();
    }

    eraseAt(x, y) {
        const shapeStore = useShapeStore.getState();
        const eraserRadius = this.properties.size.value / 2;
        const { shapes, shapeOrder } = shapeStore;
        const remainingShapes = {};
        const remainingOrder = [];
        let anyRemoved = false;

        for (const id of shapeOrder) {
            const shape = shapes[id];
            const hitTestFn = shapeHitTestRegistry[shape.type];
            const hit =
                hitTestFn &&
                hitTestFn(shape, x, y, {
                    type: "circle",
                    radius: eraserRadius,
                });

            if (!hit) {
                remainingShapes[id] = shape;
                remainingOrder.push(id);
            } else {
                anyRemoved = true;
            }
        }

        if (anyRemoved) {
            shapeStore.setShapes(remainingShapes, remainingOrder);
        }
    }
}
