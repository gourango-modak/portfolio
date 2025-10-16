import { generateId } from "../../../utils/common";
import { computeShapeBoundingBox } from "../boundingBox/shapeBoundingBox";
import { CANVAS_MODES } from "../constants";
import { SHAPES } from "../shapes/constants";
import { canvasPropertiesSlice, frameSlice } from "../store/utils";
import { TEXT_LINE_HEIGHT } from "../tools/constants";
import { SELECTION_RECT_PADDING } from "./../components/SelectionOutlineLayer/constants";

export const DEFAULT_FRAME_TITLE = "Frame"; // default text for frame titles
export const FRAME_TITLE_OFFSET_Y = 3.5 * SELECTION_RECT_PADDING; // distance from top of frame to title
export const FRAME_TITLE_FONT_SIZE = 12; // font size in px
export const FRAME_TITLE_WIDTH = FRAME_TITLE_FONT_SIZE * 4; // width of the title text area
export const FRAME_TITLE_FONT_FAMILY = "Arial"; // font family

export function createFrameTitleShape({
    x,
    y,
    text = DEFAULT_FRAME_TITLE,
    color = "#000",
}) {
    return {
        id: generateId(),
        type: SHAPES.TEXT,
        x,
        y,
        width: FRAME_TITLE_WIDTH,
        height: FRAME_TITLE_FONT_SIZE * TEXT_LINE_HEIGHT,
        text,
        properties: {
            color: { value: color },
            fontSize: { value: FRAME_TITLE_FONT_SIZE },
            fontFamily: { value: FRAME_TITLE_FONT_FAMILY },
        },
        isEditing: false,
        locked: true,
        isFrameTitle: true,
    };
}

export const findContainingFrame = (bbox, frames) => {
    if (!bbox || !frames) return null;

    for (const frame of Object.values(frames)) {
        const { x, y, width, height } = frame;
        if (
            bbox.x >= x &&
            bbox.y >= y &&
            bbox.x + bbox.width <= x + width &&
            bbox.y + bbox.height <= y + height
        ) {
            return frame.id;
        }
    }

    return null;
};

export const resolveShapeFrameId = (shape) => {
    if (shape.locked === true) return null;

    const bbox = computeShapeBoundingBox(shape);
    const canvasMode = canvasPropertiesSlice.getSlice().properties.mode.value;

    if (canvasMode === CANVAS_MODES.PAGED) {
        const { activeFrameId } = frameSlice.getSlice();
        return activeFrameId;
    }

    const { frames } = frameSlice.getSlice();
    return findContainingFrame(bbox, frames);
};
