import {
    downloadJson,
    generateId,
    importJsonFile,
} from "../../../utils/common";
import {
    canvasPropertiesSlice,
    deserializeDrawingAppState,
    frameSlice,
    panelSlice,
    serializeDrawingAppState,
    shapeSlice,
    toolbarSlice,
} from "../store/utils";
import { exportFrameToImage, exportCanvasToImage } from "../utils/canvasUtils";
import { INSPECTOR_PANEL_TARGETS } from "./properties/constants";
import { TOOL_ACTION_TYPES } from "./toolbarConfig";

export const toolActionHandlers = {
    [TOOL_ACTION_TYPES.SELECT_TOOL]: ({ name }) => {
        toolbarSlice.getSlice().setActiveTool(name);
    },
    [TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL]: () => {
        panelSlice
            .getSlice()
            .openInspectorPanel(INSPECTOR_PANEL_TARGETS.CANVAS);
    },
    [TOOL_ACTION_TYPES.ADD_PAGE]: () => {
        frameSlice.getSlice().addFrame();
    },
    [TOOL_ACTION_TYPES.PREV_PAGE]: () => {
        frameSlice.getSlice().prevFrame();
    },
    [TOOL_ACTION_TYPES.NEXT_PAGE]: () => {
        frameSlice.getSlice().nextFrame();
    },
    [TOOL_ACTION_TYPES.EXPORT_DRAWING_STATE]: () => {
        downloadJson(serializeDrawingAppState(), generateId());
    },
    [TOOL_ACTION_TYPES.IMPORT_DRAWING_STATE]: () => {
        importJsonFile(deserializeDrawingAppState);
    },
    [TOOL_ACTION_TYPES.CLEAR_CANVAS]: () => {
        shapeSlice.getSlice().reset();
    },
    [TOOL_ACTION_TYPES.RESET_ZOOM_AND_PAN]: () => {
        canvasPropertiesSlice.getSlice().resetViewport();
    },
    [TOOL_ACTION_TYPES.EXPORT_CURRENT_PAGE_TO_IMAGE]: () => {
        const content = document.getElementById("frame-content");
        const frame = frameSlice.getSlice().getActiveFrame();
        exportFrameToImage({ content, frame, dpiScale: 1 });
    },
    [TOOL_ACTION_TYPES.EXPORT_CANVAS_TO_IMAGE]: () => {
        const svgElement = document.getElementById("svg-canvas");
        exportCanvasToImage({ svgElement, dpiScale: 2 });
    },
};
