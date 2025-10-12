import jsPDF from "jspdf";
import { addImageToPdf } from "./addImageToPdf";
import { exportCanvasToImage } from "../image/exportCanvasToImage";

export const exportCanvasToPdf = async ({
    shapes,
    scale = 1,
    fileName = "frames.pdf",
}) => {
    const pdf = new jsPDF({ unit: "pt" });
    const imgDataUrl = await exportCanvasToImage({ shapes, scale });
    await addImageToPdf(pdf, imgDataUrl, true);
    pdf.save(fileName);
};
