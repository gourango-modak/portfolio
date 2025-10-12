import { exportSvgToImage } from "./exportSvgToImage";

export const exportElementToImage = async ({
    element,
    bbox,
    padding = 0,
    scale = 1,
}) => {
    const elementToExport = wrapElementWithScale(element, scale);
    const box = getScaledBox(bbox, scale, padding);

    return await exportSvgToImage(elementToExport, {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
    });
};

const getScaledBox = (bbox, scale = 1, padding = 0) => {
    const scaledX = bbox.x * scale;
    const scaledY = bbox.y * scale;
    const scaledWidth = bbox.width * scale;
    const scaledHeight = bbox.height * scale;

    return {
        x: scaledX - padding,
        y: scaledY - padding,
        width: scaledWidth + padding * 2,
        height: scaledHeight + padding * 2,
    };
};

const wrapElementWithScale = (element, scale = 1) => {
    if (scale === 1) return element.cloneNode(true); // no need to wrap

    const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");
    wrapper.setAttribute("transform", `scale(${scale})`);
    wrapper.appendChild(element.cloneNode(true));
    return wrapper;
};
