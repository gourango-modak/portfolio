import { frameSlice, shapeSlice } from "../../store/utils";
import { createFrameTitleShape } from "../../utils/frameUtils";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const pageActions = {
    [TOOL_ACTION_TYPES.ADD_PAGE]: () => {
        const frameId = frameSlice.getSlice().addFrameFromTemplate();

        const { frames, frameOrder, updateFrame } = frameSlice.getSlice();
        const newFrame = frames[frameId];
        const titleShape = createFrameTitleShape({
            x: newFrame.x,
            y: newFrame.y,
            text: `Page_${frameOrder.length}`,
            color: newFrame.properties.borderColor.value,
        });
        titleShape.frameId = frameId;

        const titleShapeId = shapeSlice.getSlice().addShape(titleShape);
        updateFrame(frameId, { titleShapeId });
    },
    [TOOL_ACTION_TYPES.PREV_PAGE]: () => {
        frameSlice.getSlice().prevFrame();
    },
    [TOOL_ACTION_TYPES.NEXT_PAGE]: () => {
        frameSlice.getSlice().nextFrame();
    },
};
