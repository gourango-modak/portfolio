export const HANDLE_SQUARE_SIZE = 8;
export const HANDLE_CIRCLE_SIZE = 5;
export const SELECTION_RECT_PADDING = 6;
export const GROUP_SELECTION_RECT_PADDING = SELECTION_RECT_PADDING + 8;

// Offset from the shape and center position of the handle square
export const HANDLE_SQUARE_OFFSET = 10;

export const HANDLE_CURSORS = {
    // Bounding box handles
    "top-left": "nwse-resize",
    "top-right": "nesw-resize",
    "bottom-right": "nwse-resize",
    "bottom-left": "nesw-resize",

    // Line handles
    "line-start": "nesw-resize",
    "line-end": "nesw-resize",

    // Optional: add more shapes/handles here in future
};
