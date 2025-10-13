import { findShapeAtPoint, getShapeAtPoint } from "../../../shapes/utils";
import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";
import { beginMoveCommand } from "../commands/beginMoveCommand";
import { BaseObjectHandler } from "./BaseObjectHandler";
import { canvasPropertiesSlice, frameSlice } from "./../../../store/utils";
import { shapeResizeHandlers } from "../resize/shapeResizeHandlers";
import { beginResizeCommand } from "../commands/beginResizeCommand";
import { finalizeResizeCommand } from "../commands/finalizeResizeCommand";
import { finalizeMoveCommand } from "../commands/finalizeMoveCommand";
import { getRectFromPoints, isPointInRect } from "../../../utils/geometryUtils";
import { SELECTION_MODE } from "../../constants";
import { computeShapeBoundingBox } from "./../../../boundingBox/shapeBoundingBox";

export class ShapeHandler extends BaseObjectHandler {
    getSelectedIds() {
        return this.getSlice().selectedShapeIds;
    }

    getSelectedBounds() {
        return this.getSlice().selectedShapesBounds;
    }

    getObjects() {
        const shapes = this.getSlice().getShapes();

        return Object.fromEntries(
            Object.entries(shapes).filter(([_, shape]) => shape.locked !== true)
        );
    }

    deselectAll() {
        this.getSlice().deselectAll();
    }

    select(id) {
        this.getSlice().selectShape(id);
    }

    updateObject(id, props) {
        const { updateShape } = this.getSlice();
        updateShape(id, props);
    }

    beginMove(selectedIds, objects) {
        beginMoveCommand(selectedIds, objects, COMMANDS.UPDATE_SHAPES);
    }

    finalizeMove(tool, selectedIds, objects) {
        if (!tool.moving) return;
        finalizeMoveCommand(selectedIds, objects, COMMANDS.UPDATE_SHAPES);
    }

    beginResize(selectedIds, objects) {
        beginResizeCommand(selectedIds, objects, COMMANDS.UPDATE_SHAPES);
    }

    finalizeResize(tool, selectedIds, objects) {
        if (!tool.resizing) return;
        finalizeResizeCommand(selectedIds, objects, COMMANDS.UPDATE_SHAPES);
    }

    updateCursor(tool, pointer, bounds) {
        const { setCursor } = canvasPropertiesSlice.getSlice();
        if (super.updateCursor(tool)) return true;

        // Pointer inside selected shapes bounding box
        if (bounds && isPointInRect(pointer, bounds)) {
            setCursor("move");
            return true;
        }

        const selectedIds = this.getSelectedIds();
        const shapes = this.getObjects();
        const { shapeOrder } = this.getSlice();

        // Pointer over individual shapes
        for (const id of shapeOrder) {
            if (selectedIds.has(id)) continue;
            if (!shapes[id]) continue;

            if (findShapeAtPoint(shapes[id], pointer)) {
                setCursor("move");
                return true;
            }
        }

        return false;
    }

    trySelect(tool, pointer, bounds) {
        const shapes = this.getObjects();
        // Check if pointer is over a new shape
        const clickedShape = getShapeAtPoint(pointer, shapes);

        if (clickedShape) {
            const selectedIds = this.getSelectedIds();

            // If not already selected, deselect others and select this one
            if (!selectedIds.has(clickedShape.id)) {
                this.deselectAll();
                frameSlice.getSlice().deselectAll();
                this.select(clickedShape.id);
            }

            // Start moving immediately
            tool.clickedInsideSelection = true;
            this.beginMove(this.getSelectedIds(), shapes);
            return true;
        }

        // Check if pointer is inside current selection bounds
        if (bounds && isPointInRect(pointer, bounds)) {
            tool.clickedInsideSelection = true;
            this.beginMove(this.getSelectedIds(), shapes);
            return true;
        }

        return false; // nothing selected or clicked inside
    }

    applyResize(pointer, scaleX, scaleY, origin) {
        const selectedIds = this.getSelectedIds();

        selectedIds.forEach((id) => {
            const shape = this.resizeStartObjects[id];
            const resizeFn = shapeResizeHandlers[shape.type];

            if (!resizeFn) return;

            const updated = resizeFn({
                shape,
                handle: this.activeHandle,
                pointer,
                scaleX,
                scaleY,
                origin,
            });

            this.updateObject(id, updated);
        });
    }

    applyMarqueeSelection(tool, pointer) {
        if (!tool.dragging) return;

        const rect = getRectFromPoints(tool.startPoint, pointer);
        const shapes = this.getObjects();

        const selected = Object.values(shapes)
            .filter((s) =>
                this.isSelectedByRect(
                    s,
                    rect,
                    tool.properties.selectionMode.value
                )
            )
            .map((s) => s.id);

        this.deselectAll();
        selected.forEach((id) => this.select(id));
    }

    isSelectedByRect(shape, rect, selectionMode) {
        const { x, y, width, height } = computeShapeBoundingBox(shape);

        if (selectionMode === SELECTION_MODE.FULL) {
            return (
                x >= rect.x &&
                y >= rect.y &&
                x + width <= rect.x + rect.width &&
                y + height <= rect.y + rect.height
            );
        } else if (selectionMode === SELECTION_MODE.TOUCH) {
            const step = 5;
            for (let px = rect.x; px <= rect.x + rect.width; px += step) {
                for (let py = rect.y; py <= rect.y + rect.height; py += step) {
                    if (findShapeAtPoint(shape, { x: px, y: py })) return true;
                }
            }
        }
        return false;
    }
}
