import { shapeHitTestingHandlers } from "../shapes/shapeHitTesting/handlers";
import { COMMANDS } from "../store/slices/commandHistorySlice/constants";
import { commandHistorySlice, shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";
import { OUTLINE_COLOR } from "./../components/SelectionOutlineLayer/constants";
import { TOOL_PROPERTIES } from "../toolbar/components/properties/constants";

export class EraserTool extends BaseTool {
    static name = TOOLS.ERASER;
    static label = "Eraser Tool";
    static shortcut = { code: "KeyE" };

    static defaultProperties = {
        [TOOL_PROPERTIES.SIZE]: {
            value: 20,
            label: "Eraser Size",
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
        this.previewCircle.setAttribute("fill", "rgba(108, 99, 255, 0.1)");
        this.previewCircle.setAttribute("stroke", OUTLINE_COLOR);
        this.previewCircle.setAttribute("stroke-width", "1.5");
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

        this.deletedShapes = {};
        const { shapeOrder } = shapeSlice.getSlice();

        // Start command
        commandHistorySlice.getSlice().beginCommand(COMMANDS.DELETE_SHAPES, {
            shapeOrderBeforeDelete: [...shapeOrder],
            shapeIds: [],
            deletedShapes: {},
        });

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

        if (this.deletedShapes) {
            // Finalize command if anything was deleted
            const deletedIds = Object.keys(this.deletedShapes);
            if (deletedIds.length > 0) {
                commandHistorySlice
                    .getSlice()
                    .finalizeCommand(COMMANDS.DELETE_SHAPES, {
                        shapeIds: deletedIds,
                        deletedShapes: { ...this.deletedShapes },
                    });
            }
        }
    }

    eraseAt(x, y) {
        const eraserRadius = this.properties.size.value / 2;
        const { shapes, shapeOrder, setShapes } = shapeSlice.getSlice();
        const remainingShapes = {};
        const remainingOrder = [];
        let anyRemoved = false;

        for (const id of shapeOrder) {
            const shape = shapes[id];
            const hitTestFn = shapeHitTestingHandlers[shape.type];
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
                this.deletedShapes[id] = shape;
                anyRemoved = true;
            }
        }

        if (anyRemoved) {
            setShapes(remainingShapes, remainingOrder);
        }
    }
}
