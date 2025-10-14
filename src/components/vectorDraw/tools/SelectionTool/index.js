import { BaseTool } from "../BaseTool";
import { SELECTION_MODE, TOOLS } from "../constants";
import { canvasObjectRegistry } from "./handlers/canvasObjectRegistry";
import { getRectFromPoints } from "../../utils/geometryUtils";
import { getRectToPathData } from "../../utils/svgUtils";
import {
    canvasObjectSlice,
    canvasPropertiesSlice,
    frameSlice,
    shapeSlice,
} from "../../store/utils";
import { combineBoundingBoxes } from "../../boundingBox/combineBoundingBoxes";
import { CANVAS_MODES } from "../../constants";

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
        this.handlers = Object.values(canvasObjectRegistry);

        const { getCanvasMode } = canvasPropertiesSlice.getSlice();
        if (getCanvasMode() === CANVAS_MODES.PAGED) {
            this.handlers = [canvasObjectRegistry.SHAPE];
        }

        // Set the corresponding slice for each handler
        this.handlers.forEach((handler) => {
            if (handler.type === "SHAPE")
                handler.setSlice(() => shapeSlice.getSlice());
            else if (handler.type === "FRAME")
                handler.setSlice(() => frameSlice.getSlice());
        });
    }

    resetPointerState() {
        this.startPoint = null; // Initial pointer down coordinates
        this.lastPointer = null; // Last pointer move coordinates

        this.dragging = false; // True if drawing a selection rectangle

        this.moving = false; // True if moving selected shapes
        this.clickedInsideSelection = false; // Whether pointer was inside current selection

        this.resizing = false;
    }

    onPointerDown(e) {
        const pointer = { x: e.tx, y: e.ty };
        this.startPoint = pointer;
        this.lastPointer = pointer;

        // Step 0: compute combined bounds of all selected objects across handlers
        const boundsArray = this.handlers
            .map((h) => h.getSelectedBounds())
            .filter(Boolean); // remove nulls
        const combinedBounds = combineBoundingBoxes(boundsArray);

        let isAnyObjectSelected = false;
        // Step 1: Try selecting in all handlers
        for (const handler of this.handlers) {
            if (handler.trySelect(this, pointer, combinedBounds)) {
                isAnyObjectSelected = true;
            } else {
                handler.clearSelection(this);
            }
        }

        this.handlers.forEach((handler) => {
            handler.tryStartResize(this, e, combinedBounds);
        });

        // As no object is selected, clear the last selected object id
        if (!isAnyObjectSelected) {
            canvasObjectSlice.getSlice().deselectAll();
        }
    }

    onPointerMove(e) {
        const pointer = { x: e.tx, y: e.ty };
        this.updateCursorWithFallback(pointer);

        if (!this.startPoint) return;

        this.handlers.forEach((handler) => {
            handler.handleResize(this, pointer);
            handler.handleMove(this, pointer);
        });

        // Update selection marquee rectangle visually
        this.updateSelectionMarquee(pointer);
        this.handlers.forEach((handler) =>
            handler.applyMarqueeSelection(this, pointer)
        );

        this.lastPointer = pointer;
    }

    onPointerUp() {
        this.handlers.forEach((handler) =>
            handler.commitActiveOperations(this)
        );
        this.cleanUp();
        this.resetPointerState();
    }

    updateCursorWithFallback(pointer) {
        const boundsArray = this.handlers
            .map((h) => h.getSelectedBounds())
            .filter(Boolean); // remove nulls
        const combinedBounds = combineBoundingBoxes(boundsArray);

        const anyUpdated = this.handlers.some((handler) =>
            handler.updateCursor(this, pointer, combinedBounds)
        );

        if (!anyUpdated) {
            canvasPropertiesSlice.getSlice().setCursor("default");
        }
    }

    updateSelectionMarquee(pointer) {
        if (this.clickedInsideSelection || this.resizing || this.moving) return;

        if (!this.dragging) {
            this.dragging = true;
            this.createLiveElement();

            // Apply live rectangle styles
            this.liveElement.setAttribute(
                "stroke",
                this.properties.borderColor.value
            );
            this.liveElement.setAttribute(
                "stroke-width",
                this.properties.borderWidth.value
            );
            this.liveElement.setAttribute(
                "fill",
                this.properties.fillColor.value
            );
        }

        const rect = getRectFromPoints(this.startPoint, pointer);
        this.liveElement.setAttribute("d", getRectToPathData(rect));
    }
}
