import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";
import { beginResizeCommand } from "../commands/beginResizeCommand";

export function tryStartResize(
    tool,
    event,
    bounds,
    selectedIds,
    objects,
    type
) {
    if (!bounds) return;

    const handleId = event.target.getAttribute("data-handle-id");
    if (!handleId) return;

    startResize(tool, handleId, bounds, selectedIds, objects, type);
}

// Initialize resizing state and command
function startResize(tool, handleId, bounds, selectedIds, objects, type) {
    tool.resizing = true;
    tool.activeHandle = handleId;

    if (type === "SHAPES") {
        tool.originalShapeBounds = { ...bounds };
        tool.originalShapes = {};

        selectedIds.forEach((id) => {
            tool.originalShapes[id] = { ...objects[id] };
        });
    } else {
        tool.originalFrameBounds = { ...bounds };
        tool.originalFrames = {};

        selectedIds.forEach((id) => {
            tool.originalFrames[id] = { ...objects[id] };
        });
    }

    const comType =
        type === "SHAPES" ? COMMANDS.UPDATE_SHAPES : COMMANDS.UPDATE_FRAMES;
    beginResizeCommand(selectedIds, objects, comType);
}
