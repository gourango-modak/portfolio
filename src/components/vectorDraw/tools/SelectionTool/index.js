import { shapeSlice } from "../../store/utils";
import { BaseTool } from "../BaseTool";
import { SELECTION_MODE, TOOLS } from "../constants";
import { clearSelection } from "./interactions/clearSelection";
import { tryStartResize } from "./interactions/tryStartResize";
import { tryStartMove } from "./interactions/tryStartMove";
import { trySelectShape } from "./interactions/trySelectShape";
import { updateSelectionCursor } from "./helpers/updateSelectionCursor";
import { handleResizeSelection } from "./interactions/handleResizeSelection";
import { handleMoveSelection } from "./interactions/handleMoveSelection";
import { handleDragSelection } from "./interactions/handleDragSelection";
import { finalizeResizeSelection } from "./interactions/finalizeResizeSelection";
import { finalizeMoveSelection } from "./interactions/finalizeMoveSelection";
import { finalizeDragSelection } from "./interactions/finalizeDragSelection";

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
        this.resetPointerState();
    }

    resetPointerState() {
        this.startPoint = null; // Initial pointer down coordinates
        this.lastPointer = null; // Last pointer move coordinates

        this.dragging = false; // True if drawing a selection rectangle

        this.moving = false; // True if moving selected shapes
        this.clickedInsideSelection = false; // Whether pointer was inside current selection

        this.resizing = false;
        this.activeHandle = null;
        this.originalBounds = null;
        this.originalShapes = null;
    }

    onPointerDown(e) {
        const pointer = { x: e.tx, y: e.ty };
        this.startPoint = pointer;
        this.lastPointer = pointer;

        const { selectedShapesBounds, selectedShapeIds, getShapes } =
            shapeSlice.getSlice();

        const shapes = getShapes();

        tryStartResize(this, e, selectedShapesBounds, selectedShapeIds, shapes);
        trySelectShape(this, pointer, selectedShapeIds, shapes);
        tryStartMove(
            this,
            pointer,
            selectedShapesBounds,
            selectedShapeIds,
            shapes
        );
        clearSelection(this);
    }

    onPointerMove(e) {
        const pointer = { x: e.tx, y: e.ty };
        const {
            getShapes,
            selectedShapeIds,
            selectedShapesBounds,
            updateShape,
        } = shapeSlice.getSlice();

        const shapes = getShapes();

        updateSelectionCursor(
            this,
            pointer,
            shapes,
            selectedShapeIds,
            selectedShapesBounds
        );

        if (!this.startPoint) return;

        handleResizeSelection(
            this,
            pointer,
            selectedShapeIds,
            selectedShapesBounds,
            updateShape
        );
        handleMoveSelection(
            this,
            pointer,
            shapes,
            selectedShapeIds,
            updateShape
        );
        handleDragSelection(this, pointer);
        this.lastPointer = pointer;
    }

    onPointerUp(e) {
        const { getShapes, selectedShapeIds, deselectAll, selectShape } =
            shapeSlice.getSlice();

        const shapes = getShapes();

        finalizeResizeSelection(this, selectedShapeIds, shapes);
        finalizeMoveSelection(this, selectedShapeIds, shapes);
        finalizeDragSelection(
            this,
            this.startPoint,
            { x: e.tx, y: e.ty },
            shapes,
            deselectAll,
            selectShape
        );

        this.cleanUp();
        this.resetPointerState();
    }
}
