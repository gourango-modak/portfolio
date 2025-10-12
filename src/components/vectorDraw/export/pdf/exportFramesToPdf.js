import jsPDF from "jspdf";
import { addImageToPdf } from "./addImageToPdf";
import { exportFrameToImage } from "../image/exportFrameToImage";

export const exportFramesToPdf = async ({
    frames,
    shapes,
    scale = 1,
    fileName = "frames.pdf",
}) => {
    const pdf = new jsPDF({ unit: "pt" });

    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const imgDataUrl = await exportFrameToImage({ frame, scale, shapes });
        await addImageToPdf(pdf, imgDataUrl, i === 0);
    }

    pdf.save(fileName);
};
