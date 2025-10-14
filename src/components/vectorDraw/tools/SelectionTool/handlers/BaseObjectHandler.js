import { HANDLE_CURSORS } from "../../../components/SelectionOutlineLayer/constants";
import { canvasPropertiesSlice } from "../../../store/utils";
import { computeResizedBoundingBox } from "../resize/computeResizedBoundingBox";

export class BaseObjectHandler {
    constructor(type) {
        this.getSlice = null;
        this.type = type;
        this.resizeStartBounds = null;
        this.resizeStartObjects = {};
    }

    setSlice(getSliceFn) {
        this.getSlice = getSliceFn;
    }

    getSelectedIds() {
        throw new Error("getSelectedIds() not implemented");
    }

    getSelectedBounds() {
        throw new Error("getSelectedBounds() not implemented");
    }

    getObjects() {
        throw new Error("getObjects() not implemented");
    }

    deselectAll() {
        throw new Error("deselectAll() not implemented");
    }

    select(id) {
        throw new Error("select() not implemented");
    }

    updateObject(id, props) {
        throw new Error("updateObject() must be implemented in subclass");
    }

    beginMove(selectedIds, objects) {
        throw new Error("beginMove() not implemented");
    }

    updateCursor(tool) {
        const { setCursor } = canvasPropertiesSlice.getSlice();

        if (tool.resizing && this.activeHandle) {
            setCursor(HANDLE_CURSORS[this.activeHandle]);
            return true;
        }

        // Default fallback handled by subclasses or tool
        return false;
    }

    tryStartResize(tool, event, bounds) {
        if (!bounds) return;

        const handleId = event.target.getAttribute("data-handle-id");
        if (!handleId) return;

        this.activeHandle = handleId;
        this.startResize(tool, bounds);
    }

    startResize(tool, bounds) {
        tool.resizing = true;

        const selectedIds = this.getSelectedIds();
        const objects = this.getObjects();
        this.resizeStartBounds = { ...bounds };
        this.resizeStartObjects = Object.fromEntries(
            Array.from(selectedIds).map((id) => [id, { ...objects[id] }])
        );

        this.beginResize(selectedIds, objects);
    }

    computeScaleFactors(oldW, oldH, newW, newH) {
        return {
            scaleX: newW / oldW,
            scaleY: newH / oldH,
        };
    }

    handleResize(tool, pointer) {
        if (!tool.resizing || !this.resizeStartBounds) return;

        const { x, y, width, height } = this.resizeStartBounds;

        const { newW, newH, origin } = computeResizedBoundingBox(
            this.activeHandle,
            { x, y, width, height },
            pointer
        );

        const { scaleX, scaleY } = this.computeScaleFactors(
            width,
            height,
            newW,
            newH
        );
        this.applyResize(pointer, scaleX, scaleY, origin);
    }

    handleMove(tool, pointer, moveThreshold = 3) {
        if (tool.resizing) return;

        const { dx, dy, dist } = this.computePointerDelta(tool, pointer);
        const selectedIds = this.getSelectedIds();
        const objects = this.getObjects();

        // If we're not yet moving, check if we should start
        if (!tool.moving) {
            if (!tool.clickedInsideSelection || dist <= moveThreshold) return;
            tool.moving = true;
        }

        if (selectedIds.size > 0) {
            selectedIds.forEach((id) => {
                const obj = objects[id];
                this.updateObject(id, { x: obj.x + dx, y: obj.y + dy });
            });
        }
    }

    computePointerDelta(tool, pointer) {
        return {
            dx: pointer.x - tool.lastPointer.x,
            dy: pointer.y - tool.lastPointer.y,
            dist: Math.hypot(
                pointer.x - tool.startPoint.x,
                pointer.y - tool.startPoint.y
            ),
        };
    }

    commitActiveOperations(tool) {
        const selectedIds = this.getSelectedIds();
        const objects = this.getObjects();
        this.finalizeResize(tool, selectedIds, objects);
        this.finalizeMove(tool, selectedIds, objects);
    }

    clearSelection() {
        this.deselectAll();
    }
}
