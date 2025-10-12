import {
    downloadFile,
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
import { INSPECTOR_PANEL_TARGETS } from "./properties/constants";
import { TOOL_ACTION_TYPES } from "./toolbarConfig";
import { exportFramesToPdf } from "./../export/pdf/exportFramesToPdf";
import { exportFrameToImage } from "../export/image/exportFrameToImage";
import { exportFramesToImages } from "../export/image/exportFramesToImages";
import { exportCanvasToImage } from "../export/image/exportCanvasToImage";
import { exportCanvasToPdf } from "../export/pdf/exportCanvasToPdf";

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
        frameSlice.getSlice().addFrameFromTemplate();
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
    [TOOL_ACTION_TYPES.EXPORT_CURRENT_PAGE_TO_IMAGE]: async () => {
        const frame = frameSlice.getSlice().getActiveFrame();
        const { shapes } = shapeSlice.getSlice();
        const { frameOrder } = frameSlice.getSlice();
        const imgDataUrl = await exportFrameToImage({
            frame,
            shapes,
            scale: 1,
        });
        downloadFile(imgDataUrl, `Page_${frameOrder.indexOf(frame.id)}.png`);
    },
    [TOOL_ACTION_TYPES.EXPORT_ALL_PAGES_TO_IMAGES]: async () => {
        const { shapes } = shapeSlice.getSlice();
        const { frames } = frameSlice.getSlice();
        const framesArray = Object.values(frames);
        const imgDataUrls = await exportFramesToImages({
            frames: framesArray,
            shapes,
            scale: 1,
        });

        for (let idx = 0; idx <= imgDataUrls.length; idx++) {
            downloadFile(imgDataUrls[idx], `Page_${idx}.png`);
        }
    },
    [TOOL_ACTION_TYPES.EXPORT_CURRENT_PAGE_TO_PDF]: async () => {
        const frame = frameSlice.getSlice().getActiveFrame();
        const { frameOrder } = frameSlice.getSlice();
        const { shapes } = shapeSlice.getSlice();
        await exportFramesToPdf({
            frames: [frame],
            shapes,
            scale: 1,
            fileName: `Page_${frameOrder.indexOf(frame.id)}.pdf`,
        });
    },
    [TOOL_ACTION_TYPES.EXPORT_ALL_PAGES_TO_PDF]: async () => {
        const { frames } = frameSlice.getSlice();
        const { shapes } = shapeSlice.getSlice();
        const framesArray = Object.values(frames);
        await exportFramesToPdf({
            frames: framesArray,
            shapes,
            scale: 1,
            fileName: "Pages.pdf",
        });
    },
    [TOOL_ACTION_TYPES.EXPORT_CANVAS_TO_IMAGE]: async () => {
        const { shapes } = shapeSlice.getSlice();
        const imgDataUrl = await exportCanvasToImage({ shapes, scale: 1 });
        downloadFile(imgDataUrl, `Canvas.png`);
    },
    [TOOL_ACTION_TYPES.EXPORT_CANVAS_TO_PDF]: async () => {
        const { shapes } = shapeSlice.getSlice();
        exportCanvasToPdf({ shapes, scale: 1, fileName: "Canvas.pdf" });
    },
};
