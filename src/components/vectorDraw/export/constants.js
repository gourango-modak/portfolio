import { CANVAS_MODES } from "../constants";

export const EXPORT_SCOPE = {
    CURRENT_PAGE: "CURRENT_PAGE",
    ALL_PAGES: "ALL_PAGES",
    ENTIRE_CANVAS: "ENTIRE_CANVAS",
};

export const EXPORT_FORMAT = {
    PNG: "PNG",
    PDF: "PDF",
    JSON: "JSON",
};

export const EXPORT_SCALE = {
    ONE_X: 1,
    TWO_X: 2,
    THREE_X: 3,
};

export const EXPORT_SELECT_SCOPE_OPTIONS = {
    CURRENT_PAGE: {
        label: "Current Page",
        value: EXPORT_SCOPE.CURRENT_PAGE,
        mode: CANVAS_MODES.PAGED,
    },
    ALL_PAGES: {
        label: "All Pages",
        value: EXPORT_SCOPE.ALL_PAGES,
        mode: CANVAS_MODES.PAGED,
    },
    ENTIRE_CANVAS: {
        label: "Entire Canvas",
        value: EXPORT_SCOPE.ENTIRE_CANVAS,
        mode: CANVAS_MODES.INFINITE,
    },
};

export const EXPORT_SELECT_FORMAT_OPTIONS = {
    PNG: { label: "PNG", value: EXPORT_FORMAT.PNG },
    PDF: { label: "PDF", value: EXPORT_FORMAT.PDF },
    JSON: {
        label: "JSON",
        value: EXPORT_FORMAT.JSON,
    },
};

export const EXPORT_SELECT_SCALE_OPTIONS = {
    ONE_X: { label: "1x", value: EXPORT_SCALE.ONE_X },
    TWO_X: { label: "2x", value: EXPORT_SCALE.TWO_X },
    THREE_X: {
        label: "3x",
        value: EXPORT_SCALE.THREE_X,
    },
};
