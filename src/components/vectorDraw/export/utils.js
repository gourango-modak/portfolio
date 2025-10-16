import JSZip from "jszip";
import {
    downloadFile,
    downloadJson,
    errorLog,
    generateId,
} from "../../../utils/common";
import {
    frameSlice,
    serializeDrawingAppState,
    shapeSlice,
} from "../store/utils";
import { EXPORT_SCALE, EXPORT_SCOPE, EXPORT_FORMAT } from "./constants";
import { exportCanvasToImage } from "./image/exportCanvasToImage";
import { exportFramesToImages } from "./image/exportFramesToImages";
import { exportFrameToImage } from "./image/exportFrameToImage";
import { exportCanvasToPdf } from "./pdf/exportCanvasToPdf";
import { exportFramesToPdf } from "./pdf/exportFramesToPdf";
import { saveAs } from "file-saver";

export const isCurrentPage = (scope) => scope === EXPORT_SCOPE.CURRENT_PAGE;
export const isAllPages = (scope) => scope === EXPORT_SCOPE.ALL_PAGES;
export const isEntireCanvas = (scope) => scope === EXPORT_SCOPE.ENTIRE_CANVAS;

export const isPNG = (format) => format === EXPORT_FORMAT.PNG;
export const isPDF = (format) => format === EXPORT_FORMAT.PDF;
export const isJSON = (format) => format === EXPORT_FORMAT.JSON;

export const isScale1x = (scale) => scale === EXPORT_SCALE.ONE_X;
export const isScale2x = (scale) => scale === EXPORT_SCALE.TWO_X;
export const isScale3x = (scale) => scale === EXPORT_SCALE.THREE_X;

export const isExportCurrentPageImage = (scope, format) =>
    isCurrentPage(scope) && isPNG(format);

export const isExportCurrentPagePDF = (scope, format) =>
    isCurrentPage(scope) && isPDF(format);

export const isExportAllPagesImage = (scope, format) =>
    isAllPages(scope) && isPNG(format);

export const isExportAllPagesPDF = (scope, format) =>
    isAllPages(scope) && isPDF(format);

export const isExportCanvasImage = (scope, format) =>
    isEntireCanvas(scope) && isPNG(format);

export const isExportCanvasPDF = (scope, format) =>
    isEntireCanvas(scope) && isPDF(format);

export const isExportCanvasJSON = (scope, format) =>
    isEntireCanvas(scope) && isJSON(format);

export const performExport = ({
    scope,
    format,
    scale = 1,
    background = true,
    onlySelected = false,
    padding = 20,
}) => {
    if (isExportCurrentPageImage(scope, format)) {
        downloadCurrentPageImage({ scale, background });
        return;
    }

    if (isExportCurrentPagePDF(scope, format)) {
        downloadCurrentPagePDF({ scale, background });
        return;
    }

    if (isExportAllPagesImage(scope, format)) {
        downloadAllPagesImage({ scale, background });
        return;
    }

    if (isExportAllPagesPDF(scope, format)) {
        downloadAllPagesPDF({ scale, background });
        return;
    }

    if (isExportCanvasImage(scope, format)) {
        downloadCanvasImage({ scale, background, onlySelected, padding });
        return;
    }

    if (isExportCanvasPDF(scope, format)) {
        downloadCanvasPDF({ scale, background, onlySelected, padding });
        return;
    }

    if (isExportCanvasJSON(scope, format)) {
        downloadCanvasJSON();
        return;
    }
};

const downloadCurrentPageImage = async ({ scale, background }) => {
    const frame = frameSlice.getSlice().getActiveFrame();
    const { shapes } = shapeSlice.getSlice();
    const { frameOrder } = frameSlice.getSlice();

    if (!frame) {
        errorLog("No page is available to export as image");
        return;
    }

    const imgDataUrl = await exportFrameToImage({
        frame,
        shapes,
        scale,
        background,
    });
    downloadFile(imgDataUrl, `Page_${frameOrder.indexOf(frame.id)}.png`);
};

const downloadCurrentPagePDF = async ({ scale }) => {
    const frame = frameSlice.getSlice().getActiveFrame();
    const { frameOrder } = frameSlice.getSlice();
    const { shapes } = shapeSlice.getSlice();

    await exportFramesToPdf({
        frames: [frame],
        shapes,
        scale,
        background,
        fileName: `Page_${frameOrder.indexOf(frame.id)}.pdf`,
    });
};

export const downloadAllPagesImage = async ({ scale, background }) => {
    const { shapes } = shapeSlice.getSlice();
    const { frames } = frameSlice.getSlice();
    const framesArray = Object.values(frames);

    // Generate image Data URLs for all frames
    const imgDataUrls = await exportFramesToImages({
        frames: framesArray,
        shapes,
        scale,
        background,
    });

    const zip = new JSZip();

    // Add each image to the ZIP
    imgDataUrls.forEach((url, idx) => {
        const base64Data = url.split(",")[1];
        zip.file(`Page_${idx + 1}.png`, base64Data, { base64: true });
    });

    // Generate ZIP file
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "All_Pages.zip");
};

const downloadAllPagesPDF = async ({ scale, background }) => {
    const { frames } = frameSlice.getSlice();
    const { shapes } = shapeSlice.getSlice();
    const framesArray = Object.values(frames);

    await exportFramesToPdf({
        frames: framesArray,
        shapes,
        scale,
        background,
        fileName: "Pages.pdf",
    });
};

const downloadCanvasImage = async ({
    scale,
    background,
    onlySelected,
    padding,
}) => {
    const imgDataUrl = await exportCanvasToImage({
        scale,
        background,
        onlySelected,
        padding,
    });
    downloadFile(imgDataUrl, "Canvas.png");
};

const downloadCanvasPDF = async ({
    scale,
    background,
    onlySelected,
    padding,
}) => {
    await exportCanvasToPdf({
        scale,
        fileName: "Canvas.pdf",
        background,
        onlySelected,
        padding,
    });
};

const downloadCanvasJSON = () => {
    downloadJson(serializeDrawingAppState(), generateId());
};
