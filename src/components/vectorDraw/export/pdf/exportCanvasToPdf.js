import jsPDF from "jspdf";
import { addImageToPdf } from "./addImageToPdf";
import { exportCanvasToImage } from "../image/exportCanvasToImage";

export const exportCanvasToPdf = async ({
    scale = 1,
    fileName = "frames.pdf",
    onlySelected = false,
    padding = 20,
}) => {
    const pdf = new jsPDF({ unit: "pt" });
    const imgDataUrl = await exportCanvasToImage({
        scale,
        onlySelected,
        padding,
    });
    await addImageToPdf(pdf, imgDataUrl, true);
    pdf.save(fileName);
};
