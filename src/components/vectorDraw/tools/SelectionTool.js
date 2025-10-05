import { findShapeAtPoint, getShapeBoundingRect } from "../canvasUtils";
import { isPointInRect } from "../geometryUtils";
import { useCanvasStore } from "../store/useCanvasStore";
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

        // --- Pointer & interaction state ---
        this.startPoint = null;
        this.lastPointer = null;
        this.dragging = false; // dragging selection rectangle
        this.moving = false; // moving selected shapes
        this.clickCandidateId = null; // shape clicked on pointer down
        this.clickedInsideSelection = false; // pointer inside selection bounding box
    }

    /** --- PRIVATE UTILITY METHODS --- */

    /** Update cursor based on pointer position and shapes */
    _updateCursor(pointer, shapes, selectedShapeIds, selectedShapesBounds) {
        let cursorSet = false;

        // 1. Check if pointer is inside selected shapes bounding box
        if (
            selectedShapesBounds &&
            isPointInRect(pointer, selectedShapesBounds)
        ) {
            useCanvasStore.getState().setCursor("move");
            cursorSet = true;
        }

        // 2. Check if pointer is over any individual shape (skip selected shapes)
        if (!cursorSet) {
            for (const id in shapes) {
                if (selectedShapeIds.has(id)) continue;
                if (findShapeAtPoint(shapes[id], pointer)) {
                    useCanvasStore.getState().setCursor("move");
                    cursorSet = true;
                    break; // early exit for performance
                }
            }
        }

        // 3. Default cursor if pointer not over any shape
        if (!cursorSet) useCanvasStore.getState().setCursor("default");
    }

    /** Calculate rectangle dimensions from two points */
    _getRectFromPoints(p1, p2) {
        const x = Math.min(p1.x, p2.x);
        const y = Math.min(p1.y, p2.y);
        const width = Math.abs(p2.x - p1.x);
        const height = Math.abs(p2.y - p1.y);
        return { x, y, width, height };
    }

    /** Convert rectangle to SVG path data */
    _rectToPathData(rect) {
        const { x, y, width, height } = rect;
        return `M${x},${y} L${x + width},${y} L${x + width},${
            y + height
        } L${x},${y + height} Z`;
    }

    /** Check if a shape is fully inside a rectangle */
    _isShapeFullyInsideRect(shape, rect) {
        const { x, y, width, height } = getShapeBoundingRect(shape);
        return (
            x >= rect.x &&
            y >= rect.y &&
            x + width <= rect.x + rect.width &&
            y + height <= rect.y + rect.height
        );
    }

    /** Returns the first shape under a point or null */
    getShapeUnderPoint({ x, y }) {
        const { shapes, shapeOrder } = useShapeStore.getState();
        const hitShapeId = shapeOrder.find((id) =>
            findShapeAtPoint(shapes[id], { x, y })
        );
        return hitShapeId || null;
    }

    /** --- EVENT HANDLERS --- */

    /** Handle pointer down */
    onPointerDown(e) {
        const store = useShapeStore.getState();
        const pointer = { x: e.tx, y: e.ty };

        this.startPoint = pointer;
        this.lastPointer = pointer;

        const selectedShapesBounds = store.selectedShapesBounds;
        const hitId = this.getShapeUnderPoint(pointer);

        // Check if clicked inside existing selection
        this.clickedInsideSelection =
            selectedShapesBounds &&
            isPointInRect(pointer, selectedShapesBounds);

        // Reset state
        this.moving = false;
        this.dragging = false;
        this.clickCandidateId = hitId || null;
    }

    /** Handle pointer move */
    onPointerMove(e) {
        const store = useShapeStore.getState();
        const pointer = { x: e.tx, y: e.ty };
        const { shapes, selectedShapeIds, selectedShapesBounds } = store;

        // --- CURSOR LOGIC ---
        this._updateCursor(
            pointer,
            shapes,
            selectedShapeIds,
            selectedShapesBounds
        );

        // --- MOVEMENT / DRAG LOGIC ---
        if (!this.startPoint) return;

        const dx = pointer.x - this.lastPointer.x;
        const dy = pointer.y - this.lastPointer.y;
        const dist = Math.hypot(
            pointer.x - this.startPoint.x,
            pointer.y - this.startPoint.y
        );
        const moveThreshold = 3;

        // Start moving selected shapes if clicked inside selection
        // and dragged beyond threshold (moveThreshold)
        if (
            !this.moving &&
            this.clickedInsideSelection &&
            dist > moveThreshold
        ) {
            this.moving = true;
        }

        // Move selected shapes
        if (this.moving) {
            selectedShapeIds.forEach((id) => {
                const shape = shapes[id];
                store.updateShape(id, { x: shape.x + dx, y: shape.y + dy });
            });
            this.lastPointer = pointer;
            return;
        }

        // Handle drag-selection rectangle
        if (dist > moveThreshold && !this.clickedInsideSelection) {
            if (!this.dragging) {
                this.dragging = true;
                this.createLivePath();

                // Apply live selection rectangle styles
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

            const rect = this._getRectFromPoints(this.startPoint, pointer);
            this.livePath.setAttribute("d", this._rectToPathData(rect));
        }
    }

    /** Handle pointer up */
    onPointerUp(e) {
        const store = useShapeStore.getState();

        // --- Case 1: no drag or move (pure click) ---
        if (!this.dragging && !this.moving) {
            const clickedId = this.clickCandidateId;
            const isSelected =
                clickedId && store.selectedShapeIds.has(clickedId);

            if (clickedId) {
                if (isSelected) store.deselectShape(clickedId);
                else {
                    store.deselectAll();
                    store.selectShape(clickedId);
                }
            } else {
                store.deselectAll(); // empty area click
            }
        }

        // --- Case 2: dragged selection rectangle ---
        else if (this.dragging) {
            const rect = this._getRectFromPoints(this.startPoint, {
                x: e.tx,
                y: e.ty,
            });

            const selected = Object.values(store.shapes)
                .filter((shape) => this._isShapeFullyInsideRect(shape, rect))
                .map((s) => s.id);

            store.deselectAll();
            selected.forEach((id) => store.selectShape(id));
        }

        // --- Cleanup ---
        this.cleanUp();
        this.startPoint = null;
        this.lastPointer = null;
        this.dragging = false;
        this.moving = false;
        this.clickCandidateId = null;
        this.clickedInsideSelection = false;
    }
}
