import { BaseObjectHandler } from "./BaseObjectHandler";
import { beginMoveCommand } from "../commands/beginMoveCommand";
import { getBoundingBoxHandleAtPoint } from "../../../components/SelectionOutlineLayer/utils";
import {
    canvasPropertiesSlice,
    panelSlice,
    shapeSlice,
} from "../../../store/utils";
import { resizeFrame } from "../resize/resizeFrame";
import { beginResizeCommand } from "../commands/beginResizeCommand";
import { finalizeMoveCommand } from "../commands/finalizeMoveCommand";
import { finalizeResizeCommand } from "../commands/finalizeResizeCommand";
import { getRectFromPoints, isPointInRect } from "../../../utils/geometryUtils";
import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";

export class FrameHandler extends BaseObjectHandler {
    getSelectedIds() {
        return this.getSlice().selectedFrameIds;
    }

    getSelectedBounds() {
        return this.getSlice().selectedFramesBounds;
    }

    getObjects() {
        return this.getSlice().frames;
    }

    deselectAll() {
        this.getSlice().deselectAll();
    }

    select(id) {
        this.getSlice().selectFrame(id);
    }

    updateObject(id, props) {
        const { updateFrame } = this.getSlice();
        updateFrame(id, props);
    }

    beginMove(selectedIds, objects) {
        beginMoveCommand(selectedIds, objects, COMMANDS.UPDATE_FRAMES);
    }

    finalizeMove(tool, selectedIds, objects) {
        if (!tool.moving) return;
        finalizeMoveCommand(selectedIds, objects, COMMANDS.UPDATE_FRAMES);
    }

    beginResize(selectedIds, objects) {
        beginResizeCommand(selectedIds, objects, COMMANDS.UPDATE_FRAMES);
    }

    finalizeResize(tool, selectedIds, objects) {
        if (!tool.resizing) return;
        finalizeResizeCommand(selectedIds, objects, COMMANDS.UPDATE_FRAMES);
    }

    updateCursor(tool, pointer, bounds) {
        const { setCursor } = canvasPropertiesSlice.getSlice();
        if (super.updateCursor(tool)) return true;

        // Pointer inside selected frames bounding box
        if (bounds && isPointInRect(pointer, bounds)) {
            setCursor("move");
            return true;
        }

        const frames = this.getObjects();
        const { frameOrder } = this.getSlice();
        const { shapes } = shapeSlice.getSlice();

        if (this.getClickedFrame(pointer, frameOrder, frames, shapes)) {
            setCursor("move");
            return true;
        }

        return false;
    }

    trySelect(tool, pointer, bounds) {
        const frames = this.getObjects();
        const { frameOrder } = this.getSlice();
        const { shapes } = shapeSlice.getSlice();

        // 1. If not, check if pointer is over frame or title
        const clickedFrame = this.getClickedFrame(
            pointer,
            frameOrder,
            frames,
            shapes
        );

        if (clickedFrame) {
            const selectedIds = this.getSelectedIds();
            // If clicked frame isn't already selected, select it (single-select)
            if (!selectedIds.has(clickedFrame.id)) {
                this.deselectAll();
                this.select(clickedFrame.id);
            }

            if (this.getSelectedIds().size === 1)
                panelSlice.getSlice().openToolPropertiesPanel();

            // Mark that the pointer started inside the selection (affects move vs drag)
            tool.clickedInsideSelection = true;
            this.beginMove(this.getSelectedIds(), frames);
            return true;
        }

        // 2. Check if pointer is inside current selection bounds
        if (bounds && isPointInRect(pointer, bounds)) {
            tool.clickedInsideSelection = true;
            this.beginMove(this.getSelectedIds(), frames);
            return true;
        }

        return false; // nothing selected or clicked inside
    }

    getClickedFrame(pointer, frameOrder, frames, shapes) {
        return frameOrder
            .map((id) => frames[id])
            .find((frame) => this.isPointerOverFrame(pointer, frame, shapes));
    }

    isPointerOverFrame(pointer, frame, shapes) {
        const { x, y, width, height } = frame;
        const isOverFrameHandle = getBoundingBoxHandleAtPoint(pointer, {
            x,
            y,
            width,
            height,
        });

        // Check frame title shape if exists
        let inTitle = false;
        if (frame.titleShapeId && shapes[frame.titleShapeId]) {
            const title = shapes[frame.titleShapeId];
            inTitle = isPointInRect(
                pointer,
                {
                    x: title.x,
                    y: title.y,
                    width: title.width,
                    height: title.height,
                },
                0
            );
        }

        return isOverFrameHandle || inTitle;
    }

    applyResize(pointer, scaleX, scaleY, origin) {
        const selectedIds = this.getSelectedIds();

        selectedIds.forEach((id) => {
            const frame = this.resizeStartObjects[id];
            const updated = resizeFrame({
                frame,
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
        const frames = this.getObjects();

        const selected = Object.values(frames)
            .filter((f) => this.isSelectedByRect(f, rect))
            .map((f) => f.id);

        this.deselectAll();
        selected.forEach((id) => this.select(id));
    }

    isSelectedByRect(frame, rect) {
        // Full selection mode
        const { x, y, width, height } = frame;
        return (
            x < rect.x + rect.width &&
            x + width.value > rect.x &&
            y < rect.y + rect.height &&
            y + height.value > rect.y
        );
    }

    handleMove(tool, pointer, moveThreshold = 3) {
        if (tool.resizing) return;

        const { dx, dy, dist } = this.computePointerDelta(tool, pointer);
        const selectedIds = this.getSelectedIds();
        const objects = this.getObjects();

        // Start moving if threshold crossed
        if (!tool.moving) {
            if (!tool.clickedInsideSelection || dist <= moveThreshold) return;
            tool.moving = true;
        }

        selectedIds.forEach((id) => {
            const obj = objects[id];

            // Move the frame
            this.updateObject(id, { x: obj.x + dx, y: obj.y + dy });

            // Move all shapes inside this frame
            const containedShapes = this.getShapesToBeMoved(obj);
            containedShapes.forEach((shape) => {
                shapeSlice.getSlice().updateShape(shape.id, {
                    x: shape.x + dx,
                    y: shape.y + dy,
                });
            });
        });
    }

    getShapesByFrame(frame, shapes) {
        return Object.values(shapes).filter(
            (s) => s.frameId === frame.id || s.id === frame.titleShapeId
        );
    }

    getShapesToBeMoved(frame) {
        const { shapes, selectedShapeIds } = shapeSlice.getSlice();
        const shapesToBeMoved = Object.values(shapes).filter(
            (s) => !selectedShapeIds.has(s.id)
        );
        return this.getShapesByFrame(frame, shapesToBeMoved);
    }
}
