import jsPDF from "jspdf";
import { addImageToPdf } from "./addImageToPdf";
import { exportCanvasToImage } from "../image/exportCanvasToImage";

export const exportCanvasToPdf = async ({
    scale = 1,
    fileName = "frames.pdf",
}) => {
    const pdf = new jsPDF({ unit: "pt" });
    const imgDataUrl = await exportCanvasToImage({ scale });
    await addImageToPdf(pdf, imgDataUrl, true);
    pdf.save(fileName);
};
