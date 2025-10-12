export const addImageToPdf = async (pdf, imgDataUrl, isFirstPage = false) => {
    const img = new Image();
    await new Promise((resolve) => {
        img.onload = () => {
            if (!isFirstPage) pdf.addPage(); // add page for frames after the first

            // Resize current page to match image dimensions
            pdf.internal.pageSize.width = img.width;
            pdf.internal.pageSize.height = img.height;

            pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
            resolve(true);
        };
        img.src = imgDataUrl;
    });
};
