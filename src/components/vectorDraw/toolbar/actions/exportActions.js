import { downloadFile } from "../../../../utils/common";
import { frameSlice, shapeSlice } from "../../store/utils";
import { exportFrameToImage } from "./../../export/image/exportFrameToImage";
import { exportFramesToImages } from "./../../export/image/exportFramesToImages";
import { exportFramesToPdf } from "./../../export/pdf/exportFramesToPdf";
import { exportCanvasToImage } from "./../../export/image/exportCanvasToImage";
import { exportCanvasToPdf } from "./../../export/pdf/exportCanvasToPdf";
import { TOOL_ACTION_TYPES } from "../config/toolActionTypes";

export const exportActions = {
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
        imgDataUrls.forEach((url, idx) => {
            downloadFile(url, `Page_${idx}.png`);
        });
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
        const imgDataUrl = await exportCanvasToImage({ scale: 1 });
        downloadFile(imgDataUrl, "Canvas.png");
    },

    [TOOL_ACTION_TYPES.EXPORT_CANVAS_TO_PDF]: async () => {
        exportCanvasToPdf({ scale: 1, fileName: "Canvas.pdf" });
    },
};
