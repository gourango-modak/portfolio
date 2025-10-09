import { beginResizeCommand } from "../commands/beginResizeCommand";

export function tryStartResize(tool, event, bounds, selectedShapeIds, shapes) {
    if (!bounds) return;

    const handleId = event.target.getAttribute("data-handle-id");
    if (!handleId) return;

    startResize(tool, handleId, bounds, selectedShapeIds, shapes);
}

// Initialize resizing state and command
function startResize(tool, handleId, bounds, selectedShapeIds, shapes) {
    tool.resizing = true;
    tool.activeHandle = handleId;
    tool.originalBounds = { ...bounds };
    tool.originalShapes = {};

    selectedShapeIds.forEach((id) => {
        tool.originalShapes[id] = { ...shapes[id] };
    });

    beginResizeCommand(selectedShapeIds, shapes);
}
