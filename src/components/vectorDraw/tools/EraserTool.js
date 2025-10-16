import { shapeHitTestingHandlers } from "../shapes/shapeHitTesting/handlers";
import { COMMANDS } from "../store/slices/commandHistorySlice/constants";
import { commandHistorySlice, frameSlice, shapeSlice } from "../store/utils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";
import { OUTLINE_COLOR } from "./../components/SelectionOutlineLayer/constants";
import { TOOL_PROPERTIES } from "../toolbar/components/properties/constants";
import { computeBoundingBox } from "./../boundingBox/defaultBoundingBox";

export class EraserTool extends BaseTool {
    static name = TOOLS.ERASER;
    static label = "Eraser Tool";
    static shortcut = { code: "KeyE" };

    static defaultProperties = {
        [TOOL_PROPERTIES.SIZE]: {
            value: 20,
            label: "Eraser Size",
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
        this.deletedFrames = {};
        this.deletedFrameTitles = {};

        const { shapeOrder } = shapeSlice.getSlice();
        const { frameOrder } = frameSlice.getSlice();

        // Begin command with compact context
        commandHistorySlice
            .getSlice()
            .beginCommand(COMMANDS.DELETE_CANVAS_OBJECTS, {
                prevProps: {
                    shapeOrderBeforeDelete: [...shapeOrder],
                    frameOrderBeforeDelete: [...frameOrder],
                    deletedShapes: {},
                    deletedFrames: {},
                },
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

        const deletedShapeIds = Object.keys(this.deletedShapes);
        const deletedFrameIds = Object.keys(this.deletedFrames);

        const anyDeleted = deletedShapeIds.length || deletedFrameIds.length;
        if (!anyDeleted) return;

        // Finalize command with minimal data
        commandHistorySlice
            .getSlice()
            .finalizeCommand(COMMANDS.DELETE_CANVAS_OBJECTS, {
                newProps: {
                    deletedShapes: this.deletedShapes,
                    deletedFrames: this.deletedFrames,
                },
            });
    }

    eraseAt(x, y) {
        const eraserRadius = this.properties.size.value / 2;
        const { shapes, shapeOrder, setShapes } = shapeSlice.getSlice();
        const { frames, frameOrder, setFrames } = frameSlice.getSlice();

        const remainingShapes = {};
        const remainingOrder = [];
        const remainingFrames = {};
        const remainingFrameOrder = [];

        let anyRemoved = false;

        const deletedShapes = {};
        const deletedFrames = {};

        // ---- Erase shapes ----
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
                deletedShapes[id] = shape;
                anyRemoved = true;
            }
        }

        // ---- Erase frames & frame titles ----
        for (const frameId of frameOrder) {
            const frame = frames[frameId];
            const frameBBox = computeBoundingBox(frame);

            const dx = Math.max(
                Math.abs(x - (frameBBox.x + frameBBox.width / 2)) -
                    frameBBox.width / 2,
                0
            );
            const dy = Math.max(
                Math.abs(y - (frameBBox.y + frameBBox.height / 2)) -
                    frameBBox.height / 2,
                0
            );
            const dist = Math.sqrt(dx * dx + dy * dy);

            const hit = dist < eraserRadius;

            if (!hit) {
                remainingFrames[frameId] = frame;
                remainingFrameOrder.push(frameId);
            } else {
                deletedFrames[frameId] = frame;
                anyRemoved = true;

                // ---- Remove associated title shape if exists ----
                if (frame.titleShapeId && shapes[frame.titleShapeId]) {
                    delete remainingShapes[frame.titleShapeId];
                    const idx = remainingOrder.indexOf(frame.titleShapeId);
                    if (idx !== -1) remainingOrder.splice(idx, 1);
                    deletedShapes[frame.titleShapeId] =
                        shapes[frame.titleShapeId];
                }
            }
        }

        // ---- Apply updates ----
        if (anyRemoved) {
            this.deletedShapes = { ...this.deletedShapes, ...deletedShapes };
            this.deletedFrames = { ...this.deletedFrames, ...deletedFrames };

            setShapes(remainingShapes, remainingOrder);
            setFrames(remainingFrames, remainingFrameOrder);
        }
    }
}
