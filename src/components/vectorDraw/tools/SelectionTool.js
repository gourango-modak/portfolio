import { shapeHitTestRegistry } from "../shapes/shapeHitTestRegistry";
import { useShapeStore } from "../store/useShapeStore";
import { BaseTool } from "./BaseTool";

export class SelectionTool extends BaseTool {
    static name = "SELECT";
    static label = "Selection Tool";
    static shortcut = { code: "KeyV" };

    static defaultProperties = {
        borderColor: { value: "#007AFF", label: "Border Color", type: "color" },
        borderWidth: {
            value: 1,
            label: "Border Width",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
        },
        fillColor: {
            value: "rgba(0, 122, 255, 0.1)",
            label: "Selection Fill",
            type: "color",
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
        this.dragging = false;
        this.selectedShapes = [];
    }

    onPointerDown(e) {
        this.startPoint = { x: e.tx, y: e.ty };
        this.dragging = false;
    }

    onPointerMove(e) {
        if (!this.startPoint) return;

        const dx = Math.abs(e.tx - this.startPoint.x);
        const dy = Math.abs(e.ty - this.startPoint.y);
        const threshold = 3;

        // If movement exceeds threshold, treat as drag selection
        if (dx > threshold || dy > threshold) {
            if (!this.dragging) {
                this.dragging = true;
                this.createLivePath();
                this.livePath.setAttribute(
                    "stroke",
                    this.properties.borderColor.value
                );
                this.livePath.setAttribute(
                    "stroke-width",
                    this.properties.borderWidth.value
                );
                this.livePath.setAttribute(
                    "fill",
                    this.properties.fillColor.value
                );
            }

            const { x, y, width, height } = this.getRectDimensions(e);
            this.livePath.setAttribute(
                "d",
                this.getPathData(x, y, width, height)
            );
        }
    }

    onPointerUp(e) {
        const store = useShapeStore.getState();

        // CASE 1: Click selection (no drag)
        if (!this.dragging) {
            const hitId = this.getShapeUnderPoint(e.tx, e.ty);
            store.deselectAll();
            if (hitId) store.selectShape(hitId);
        }

        // CASE 2: Drag selection
        else if (this.livePath && this.startPoint) {
            const { x, y, width, height } = this.getRectDimensions(e);
            const rect = { x, y, width, height };

            const selected = Object.values(store.shapes)
                .filter((shape) => this.isShapeInsideRect(shape, rect))
                .map((s) => s.id);

            store.deselectAll();
            selected.forEach((id) => store.selectShape(id));
        }

        // Cleanup
        this.cleanUp();
        this.startPoint = null;
        this.dragging = false;
    }

    getRectDimensions(e) {
        const x = Math.min(e.tx, this.startPoint.x);
        const y = Math.min(e.ty, this.startPoint.y);
        const width = Math.abs(e.tx - this.startPoint.x);
        const height = Math.abs(e.ty - this.startPoint.y);
        return { x, y, width, height };
    }

    getPathData(x, y, width, height) {
        return `M${x},${y} L${x + width},${y} L${x + width},${
            y + height
        } L${x},${y + height} Z`;
    }

    getShapeUnderPoint(x, y) {
        const { shapes, shapeOrder } = useShapeStore.getState();
        const hitShapeId = shapeOrder.find((id) => {
            const shape = shapes[id];
            const hitTestFn = shapeHitTestRegistry[shape.type];
            return hitTestFn && hitTestFn(shape, x, y);
        });

        return hitShapeId || null;
    }

    isShapeInsideRect(shape, rect) {
        if (!shape.bounds) return false;
        const { x, y, width, height } = shape.bounds;
        const shapeRight = x + width;
        const shapeBottom = y + height;
        return (
            x >= rect.x &&
            y >= rect.y &&
            shapeRight <= rect.x + rect.width &&
            shapeBottom <= rect.y + rect.height
        );
    }
}
