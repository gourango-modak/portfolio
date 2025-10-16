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
import { isPagedCanvasMode } from "../../../utils/canvasUtils";
import { FRAME_TITLE_OFFSET_Y } from "../../../utils/frameUtils";

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
        // Clone so we don’t mutate the caller’s object reference
        const extendedObjects = { ...objects };
        const extendedSelectedIds = new Set(selectedIds);

        // Include title shapes for any selected frames
        const frames = objects;
        selectedIds.forEach((id) => {
            const frame = frames[id];
            if (frame?.titleShapeId) {
                const titleShape =
                    shapeSlice.getSlice().shapes[frame.titleShapeId];
                if (titleShape) {
                    extendedObjects[frame.titleShapeId] = { ...titleShape };
                    extendedSelectedIds.add(frame.titleShapeId);
                }
            }
        });

        beginResizeCommand(
            extendedSelectedIds,
            extendedObjects,
            COMMANDS.UPDATE_FRAMES
        );
    }

    finalizeResize(tool, selectedIds, objects) {
        if (!tool.resizing) return;

        // Clone to avoid mutating the caller’s reference
        const extendedObjects = { ...objects };
        const extendedSelectedIds = new Set(selectedIds);

        // Include title shapes for any selected frames
        const { shapes } = shapeSlice.getSlice();

        const frames = objects;
        selectedIds.forEach((id) => {
            const frame = frames[id];
            if (frame?.titleShapeId) {
                const titleShape = shapes[frame.titleShapeId];
                if (titleShape) {
                    extendedObjects[frame.titleShapeId] = { ...titleShape };
                    extendedSelectedIds.add(frame.titleShapeId);
                }
            }
        });

        finalizeResizeCommand(
            extendedSelectedIds,
            extendedObjects,
            COMMANDS.UPDATE_FRAMES
        );
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

        const { hitType } = this.getClickedFrame(
            pointer,
            frameOrder,
            frames,
            shapes,
            isPagedCanvasMode() ? { checkHandles: false } : {}
        );

        if (hitType) {
            if (isPagedCanvasMode() && hitType === "title") {
                setCursor("pointer");
            } else {
                setCursor("move");
            }

            return true;
        }

        return false;
    }

    trySelect(tool, pointer, bounds) {
        const frames = this.getObjects();
        const { frameOrder } = this.getSlice();
        const { shapes } = shapeSlice.getSlice();

        // 1. If not, check if pointer is over frame or title
        const { frame: clickedFrame } = this.getClickedFrame(
            pointer,
            frameOrder,
            frames,
            shapes,
            isPagedCanvasMode() ? { checkHandles: false } : {}
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

            // Don't apply begin move as we don't want move functionality in paged canvas mode
            if (!isPagedCanvasMode()) {
                this.beginMove(this.getSelectedIds(), frames);
            }

            return true;
        }

        // 2. Check if pointer is inside current selection bounds
        if (bounds && isPointInRect(pointer, bounds)) {
            tool.clickedInsideSelection = true;

            // Begin move if there is frame selected
            if (this.getSelectedIds().size > 0) {
                this.beginMove(this.getSelectedIds(), frames);
            }

            return true;
        }

        return false; // nothing selected or clicked inside
    }

    getClickedFrame(pointer, frameOrder, frames, shapes, options = {}) {
        for (const id of frameOrder) {
            const frame = frames[id];
            const hitType = this.isPointerOverFrame(
                pointer,
                frame,
                shapes,
                options
            );

            if (hitType) {
                return { frame, hitType };
            }
        }

        return {};
    }

    isPointerOverFrame(pointer, frame, shapes, options = {}) {
        const { checkHandles = true, checkTitle = true } = options;
        const { x, y, width, height } = frame;

        let hitType = null;

        if (checkHandles) {
            const handleHit = getBoundingBoxHandleAtPoint(pointer, {
                x,
                y,
                width,
                height,
            });
            if (handleHit) {
                hitType = "handle";
            }
        }

        if (!hitType && checkTitle) {
            const titleHit = this.isPointerOverTitle(pointer, frame, shapes);
            if (titleHit) {
                hitType = "title";
            }
        }

        return hitType; // returns "handle", "title", or null
    }

    isPointerOverTitle(pointer, frame, shapes) {
        if (!frame?.titleShapeId) return false;

        const title = shapes?.[frame.titleShapeId];
        if (!title) return false;

        return isPointInRect(
            pointer,
            {
                x: title.x,
                y: title.y - FRAME_TITLE_OFFSET_Y,
                width: title.width,
                height: title.height,
            },
            0
        );
    }

    applyResize(pointer, scaleX, scaleY, origin) {
        const selectedIds = this.getSelectedIds();

        selectedIds.forEach((id) => {
            const frame = this.resizeStartObjects[id];
            const updatedFrame = resizeFrame({
                frame,
                handle: this.activeHandle,
                pointer,
                scaleX,
                scaleY,
                origin,
            });

            this.updateObject(id, updatedFrame);

            const { shapes } = shapeSlice.getSlice();
            const titleShape = this.getFrameTitleShape(frame, shapes);

            if (titleShape) {
                shapeSlice.getSlice().updateShape(titleShape.id, {
                    x: updatedFrame.x,
                    y: updatedFrame.y,
                });
            }
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
            x + width > rect.x &&
            y < rect.y + rect.height &&
            y + height > rect.y
        );
    }

    handleMove(tool, pointer, moveThreshold = 3) {
        if (tool.resizing) return;

        // We don't want move functionality in paged canvas mode for frame
        if (isPagedCanvasMode()) return;

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

    getFrameTitleShape(frame, shapes) {
        return Object.values(shapes).filter(
            (s) => s.id === frame.titleShapeId
        )[0];
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
