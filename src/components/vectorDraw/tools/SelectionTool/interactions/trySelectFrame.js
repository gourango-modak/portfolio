import { getBoundingBoxHandleAtPoint } from "../../../components/SelectionOutlineLayer/utils";
import { COMMANDS } from "../../../store/slices/commandHistorySlice/constants";
import { frameSlice } from "../../../store/utils";
import { beginMoveCommand } from "../commands/beginMoveCommand";

export function trySelectFrame(tool, pointer, selectedFrameIds, frames) {
    let clickedFrame = null;

    // Find the frame under the pointer (any border or inside, depending on your needs)
    for (const id in frames) {
        const frame = frames[id];
        const { x, y, width, height } = frame;
        const handle = getBoundingBoxHandleAtPoint(pointer, {
            x,
            y,
            width: width.value,
            height: height.value,
        });
        if (handle) {
            clickedFrame = frame;
            break;
        }
    }

    if (!clickedFrame) return;

    const { deselectAll, selectFrame } = frameSlice.getSlice();

    // If clicked frame isn't already selected, select it (single-select)
    if (!selectedFrameIds.has(clickedFrame.id)) {
        deselectAll();
        selectFrame(clickedFrame.id);
    }

    // Mark that the pointer started inside the selection (affects move vs drag)
    tool.clickedInsideSelection = true;

    // Begin move command (you can extend this to frames if needed)
    beginMoveCommand(selectedFrameIds, frames, COMMANDS.UPDATE_FRAMES);
}
