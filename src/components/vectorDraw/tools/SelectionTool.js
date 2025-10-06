import { findShapeAtPoint, getShapeBoundingRect } from "../canvasUtils";
import { isPointInRect } from "../geometryUtils";
import { canvasPropertiesSlice, shapeSlice } from "../store/storeUtils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./toolsUtils";

export const SELECTION_MODE = {
    FULL: "FULL",
    TOUCH: "TOUCH",
};

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
            value: "#007AFF19",
            label: "Selection Fill",
            type: "color",
        },
        selectionMode: {
            value: SELECTION_MODE.TOUCH,
            label: "Selection Mode",
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

        const { setCursor } = canvasPropertiesSlice.getSlice();

        // 1. Check if pointer is inside selected shapes bounding box
        if (
            selectedShapesBounds &&
            isPointInRect(pointer, selectedShapesBounds)
        ) {
            setCursor("move");
            cursorSet = true;
        }

        // 2. Check if pointer is over any individual shape (skip selected shapes)
        if (!cursorSet) {
            for (const id in shapes) {
                if (selectedShapeIds.has(id)) continue;
                if (findShapeAtPoint(shapes[id], pointer)) {
                    setCursor("move");
                    cursorSet = true;
                    break; // early exit for performance
                }
            }
        }

        // 3. Default cursor if pointer not over any shape
        if (!cursorSet) setCursor("default");
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

    /** Check if shape is selected by rectangle based on selectionMode */
    _isShapeSelectedByRect(shape, rect) {
        const { x, y, width, height } = getShapeBoundingRect(shape);

        if (this.properties.selectionMode.value === SELECTION_MODE.FULL) {
            // Fully inside selection
            return (
                x >= rect.x &&
                y >= rect.y &&
                x + width <= rect.x + rect.width &&
                y + height <= rect.y + rect.height
            );
        } else if (
            this.properties.selectionMode.value === SELECTION_MODE.TOUCH
        ) {
            // Hit-test: check a few points inside the selection rect to see if they touch the shape
            const step = 5; // sampling step in px
            for (let px = rect.x; px <= rect.x + rect.width; px += step) {
                for (let py = rect.y; py <= rect.y + rect.height; py += step) {
                    if (findShapeAtPoint(shape, { x: px, y: py })) {
                        return true; // at least one point hits the shape
                    }
                }
            }
        }

        return false;
    }

    /** Returns the first shape under a point or null */
    getShapeUnderPoint({ x, y }) {
        const { shapes, shapeOrder } = shapeSlice.getSlice();
        const hitShapeId = shapeOrder.find((id) =>
            findShapeAtPoint(shapes[id], { x, y })
        );
        return hitShapeId || null;
    }

    /** --- EVENT HANDLERS --- */

    /** Handle pointer down */
    onPointerDown(e) {
        const pointer = { x: e.tx, y: e.ty };

        this.startPoint = pointer;
        this.lastPointer = pointer;

        const { selectedShapesBounds } = shapeSlice.getSlice();
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
        const pointer = { x: e.tx, y: e.ty };
        const { shapes, selectedShapeIds, selectedShapesBounds, updateShape } =
            shapeSlice.getSlice();

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
                updateShape(id, { x: shape.x + dx, y: shape.y + dy });
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
        const {
            shapes,
            selectedShapeIds,
            deselectShape,
            deselectAll,
            selectShape,
        } = shapeSlice.getSlice();

        // --- Case 1: no drag or move (pure click) ---
        if (!this.dragging && !this.moving) {
            const clickedId = this.clickCandidateId;
            const isSelected = clickedId && selectedShapeIds.has(clickedId);

            if (clickedId) {
                if (isSelected) deselectShape(clickedId);
                else {
                    deselectAll();
                    selectShape(clickedId);
                }
            } else {
                deselectAll(); // empty area click
            }
        }

        // --- Case 2: dragged selection rectangle ---
        else if (this.dragging) {
            const rect = this._getRectFromPoints(this.startPoint, {
                x: e.tx,
                y: e.ty,
            });

            const selected = Object.values(shapes)
                .filter((shape) => this._isShapeSelectedByRect(shape, rect))
                .map((s) => s.id);

            deselectAll();
            selected.forEach((id) => selectShape(id));
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
