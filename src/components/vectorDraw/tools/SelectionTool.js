import { getRectFromPoints, isPointInRect } from "../utils/geometryUtils";
import { getShapeAtPoint, isShapeSelectedByRect } from "../shapes/utils";
import { COMMANDS } from "../store/slices/commandHistorySlice/constants";
import { commandHistorySlice, shapeSlice } from "../store/utils";
import { getRectToPathData } from "../utils/svgUtils";
import { BaseTool } from "./BaseTool";
import { SELECTION_MODE, TOOLS } from "./constants";
import { updateSelectionToolCursor } from "./utils";

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
        selectionMode: { value: SELECTION_MODE.TOUCH, label: "Selection Mode" },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);

        // --- Initialize pointer/interaction state ---
        this.resetPointerState();
    }

    /** Reset pointer & interaction state after pointer up or cancel */
    resetPointerState() {
        this.startPoint = null; // Initial pointer down coordinates
        this.lastPointer = null; // Last pointer move coordinates
        this.dragging = false; // True if drawing a selection rectangle
        this.moving = false; // True if moving selected shapes
        this.clickedInsideSelection = false; // Whether pointer was inside current selection
    }

    /** --- POINTER EVENT HANDLERS --- */

    /** Handle pointer down */
    onPointerDown(e) {
        const pointer = { x: e.tx, y: e.ty };
        this.startPoint = pointer;
        this.lastPointer = pointer;

        const { selectedShapesBounds, selectedShapeIds, shapes } =
            shapeSlice.getSlice();

        // Check if pointer hits any shape
        const clickedShape = getShapeAtPoint(pointer);

        // Determine if click occurred inside current selection bounds
        const clickedInsideSelection =
            selectedShapesBounds &&
            isPointInRect(pointer, selectedShapesBounds);

        if (clickedShape) {
            if (!selectedShapeIds.has(clickedShape.id)) {
                // Clicked a shape that is NOT selected: select only this shape
                shapeSlice.getSlice().deselectAll();
                shapeSlice.getSlice().selectShape(clickedShape.id);
            }
            // Now this shape is selected (either newly or already)
            this.clickedInsideSelection = true;

            // Begin move command immediately so user can drag
            const {
                selectedShapeIds: updatedSelection,
                shapes: currentShapes,
            } = shapeSlice.getSlice();
            if (updatedSelection.size > 0) {
                this.beginMoveCommand(updatedSelection, currentShapes);
            }
        } else if (clickedInsideSelection) {
            // Clicked inside current selection (already selected shapes)
            this.clickedInsideSelection = true;

            // Begin move command for existing selection
            this.beginMoveCommand(selectedShapeIds, shapes);
        } else {
            // Clicked empty space, deselect all
            shapeSlice.getSlice().deselectAll();
            this.clickedInsideSelection = false;
        }
    }

    /** Handle pointer move */
    onPointerMove(e) {
        const pointer = { x: e.tx, y: e.ty };
        const { shapes, selectedShapeIds, selectedShapesBounds, updateShape } =
            shapeSlice.getSlice();

        // Update cursor depending on hover state
        updateSelectionToolCursor(
            pointer,
            shapes,
            selectedShapeIds,
            selectedShapesBounds
        );

        if (!this.startPoint) return;

        // Compute movement delta and distance from initial pointer
        const dx = pointer.x - this.lastPointer.x;
        const dy = pointer.y - this.lastPointer.y;
        const dist = Math.hypot(
            pointer.x - this.startPoint.x,
            pointer.y - this.startPoint.y
        );
        const moveThreshold = 3; // Minimum distance to start move or drag

        // Start moving selected shapes if click was inside selection and drag exceeds threshold
        if (
            !this.moving &&
            this.clickedInsideSelection &&
            dist > moveThreshold
        ) {
            this.moving = true;
        }

        // Move selected shapes if in move mode
        if (this.moving) {
            this.moveSelectedShapes(
                selectedShapeIds,
                shapes,
                dx,
                dy,
                updateShape
            );
        }
        // Start or update drag-selection rectangle if click outside selection
        else if (!this.clickedInsideSelection && dist > moveThreshold) {
            this.handleDragSelection(pointer);
        }

        this.lastPointer = pointer;
    }

    /** Handle pointer up */
    onPointerUp(e) {
        const {
            shapes,
            selectedShapeIds,
            deselectAll,
            deselectShape,
            selectShape,
        } = shapeSlice.getSlice();

        // CASE 1: Drag-selection rectangle
        if (this.dragging) {
            this.selectShapesInRect(
                this.startPoint,
                { x: e.tx, y: e.ty },
                shapes,
                deselectAll,
                selectShape
            );
        }
        // CASE 2: Moved shapes, finalize command
        else if (this.moving) {
            this.finalizeMoveCommand(selectedShapeIds, shapes);
        }

        // --- Cleanup ---
        this.cleanUp();
        this.resetPointerState();
    }

    /** --- MOVEMENT / COMMAND HELPERS --- */

    /** Start command batch for moving selected shapes */
    beginMoveCommand(selectedShapeIds, shapes) {
        const prevProps = {};
        selectedShapeIds.forEach((id) => {
            const s = shapes[id];
            prevProps[id] = { x: s.x, y: s.y };
        });
        commandHistorySlice
            .getSlice()
            .beginCommand(COMMANDS.UPDATE_SHAPES, { prevProps });
    }

    /** Move selected shapes by dx, dy */
    moveSelectedShapes(ids, shapes, dx, dy, updateShape) {
        ids.forEach((id) => {
            const shape = shapes[id];
            updateShape(id, { x: shape.x + dx, y: shape.y + dy });
        });
    }

    /** Finalize move command (commit new positions) */
    finalizeMoveCommand(ids, shapes) {
        const newProps = {};
        ids.forEach((id) => {
            const s = shapes[id];
            newProps[id] = { x: s.x, y: s.y };
        });
        commandHistorySlice.getSlice().finalizeCommand({ newProps });
    }

    /** --- SELECTION HELPERS --- */

    /** Select shapes inside a dragged rectangle */
    selectShapesInRect(start, end, shapes, deselectAll, selectShape) {
        const rect = getRectFromPoints(start, end);

        const selected = Object.values(shapes)
            .filter((s) =>
                isShapeSelectedByRect(
                    s,
                    rect,
                    this.properties.selectionMode.value
                )
            )
            .map((s) => s.id);

        deselectAll();
        selected.forEach((id) => selectShape(id));
    }

    /** Initialize or update the drag-selection rectangle */
    handleDragSelection(pointer) {
        if (!this.dragging) {
            this.dragging = true;
            this.createLivePath();

            // Apply live rectangle styles
            this.livePath.setAttribute(
                "stroke",
                this.properties.borderColor.value
            );
            this.livePath.setAttribute(
                "stroke-width",
                this.properties.borderWidth.value
            );
            this.livePath.setAttribute("fill", this.properties.fillColor.value);
        }

        const rect = getRectFromPoints(this.startPoint, pointer);
        this.livePath.setAttribute("d", getRectToPathData(rect));
    }
}
