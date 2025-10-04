import { getShapeBoundingRect } from "../canvasUtils";
import { isPointInRect } from "../geometryUtils";
import { shapeHitTestRegistry } from "../shapes/shapeHitTestRegistry";
import { useShapeStore } from "../store/useShapeStore";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./toolsUtils";

export class SelectionTool extends BaseTool {
    static name = TOOLS.SELECTION;
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
        this.dragging = false; // For selection rectangle
        this.moving = false; // For moving selected shapes
        this.lastPointer = null; // Track last pointer for moving
    }

    onPointerDown(e) {
        const store = useShapeStore.getState();
        this.startPoint = { x: e.tx, y: e.ty };
        this.lastPointer = { x: e.tx, y: e.ty };

        const selectedShapesBounds = store.selectedShapesBounds;
        const hitId = this.getShapeUnderPoint(e.tx, e.ty);

        // Check if clicked inside existing selection
        const clickedInsideSelection =
            selectedShapesBounds &&
            isPointInRect({ x: e.tx, y: e.ty }, selectedShapesBounds);

        this.moving = false;
        this.dragging = false;
        this.clickCandidateId = hitId || null; // store which shape was clicked
        this.clickedInsideSelection = clickedInsideSelection;
    }

    onPointerMove(e) {
        if (!this.startPoint) return;
        const store = useShapeStore.getState();

        const dx = e.tx - this.lastPointer.x;
        const dy = e.ty - this.lastPointer.y;

        const dist = Math.hypot(
            e.tx - this.startPoint.x,
            e.ty - this.startPoint.y
        );
        const moveThreshold = 3;

        // Start moving if clicked inside selection and dragged beyond threshold
        if (
            !this.moving &&
            this.clickedInsideSelection &&
            dist > moveThreshold
        ) {
            this.moving = true;
        }

        // Move shapes
        if (this.moving) {
            store.selectedShapeIds.forEach((id) => {
                const shape = store.shapes[id];
                store.updateShape(id, { x: shape.x + dx, y: shape.y + dy });
            });
            this.lastPointer = { x: e.tx, y: e.ty };
            return;
        }

        // Handle drag selection rect
        if (dist > moveThreshold && !this.clickedInsideSelection) {
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

        // Case 1: no drag or move (pure click)
        if (!this.dragging && !this.moving) {
            const clickedId = this.clickCandidateId;
            const isSelected =
                clickedId && store.selectedShapeIds.has(clickedId);

            if (clickedId) {
                // toggle selection if already selected
                if (isSelected) {
                    store.deselectShape(clickedId);
                } else {
                    store.deselectAll();
                    store.selectShape(clickedId);
                }
            } else {
                // empty area click — clear selection
                store.deselectAll();
            }
        }

        // Case 2: dragged selection box
        else if (this.dragging) {
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
        this.moving = false;
        this.lastPointer = null;
        this.clickCandidateId = null;
        this.clickedInsideSelection = false;
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
        const { x, y, width, height } = getShapeBoundingRect(shape);
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
