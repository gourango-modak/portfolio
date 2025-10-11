import html2canvas from "html2canvas";
import { DPI_SCALE } from "../constants";
import { canvasPropertiesSlice } from "../store/utils";

let canvasLastPointerPosition = { x: 0, y: 0 };

export const updateCanvasLastPointerPosition = (e) => {
    const { tx, ty } = getTransformedEvent(e);
    canvasLastPointerPosition = {
        x: tx,
        y: ty,
    };
};

export const getCanvasLastPointerPosition = () => canvasLastPointerPosition;

export const getTransformedEvent = (e) => {
    const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
    return {
        ...e,
        tx: (e.clientX - pan.x) / scale,
        ty: (e.clientY - pan.y) / scale,
    };
};

export function toViewportPoint({ x, y }, scale, pan) {
    if (!scale) {
        scale = canvasPropertiesSlice.getSlice().properties.scale;
    }
    if (!pan) {
        pan = canvasPropertiesSlice.getSlice().properties.pan;
    }

    return {
        x: x * scale + pan.x,
        y: y * scale + pan.y,
    };
}

const createExportCanvas = (width, height, dpiScale = 3) => {
    const canvas = document.createElement("canvas");
    canvas.width = width * dpiScale;
    canvas.height = height * dpiScale;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpiScale, dpiScale);
    return { canvas, ctx };
};

/**
 * Convert HTML <div> inside <foreignObject> to <image> for canvas
 * // TODO: Fix text export issue
 */
const rasterizeForeignObjects = async (svg) => {
    const foreignObjects = Array.from(svg.querySelectorAll("foreignObject"));

    for (const fo of foreignObjects) {
        const htmlDiv = fo.querySelector("div");
        if (!htmlDiv) continue;

        const width = parseFloat(fo.getAttribute("width"));
        const height = parseFloat(fo.getAttribute("height"));

        // Clone div
        const divClone = htmlDiv.cloneNode(true);

        // Force it to match FO box size
        divClone.style.width = width + "px";
        divClone.style.height = height + "px";
        divClone.style.overflow = "hidden";
        divClone.style.display = "flex"; // optional - prevents weird shrink
        divClone.style.alignItems = "flex-start"; // keeps text top-aligned

        // Create temp container
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.top = "-9999px";
        tempContainer.style.left = "-9999px";
        tempContainer.appendChild(divClone);
        document.body.appendChild(tempContainer);

        // Rasterize
        const canvas = await html2canvas(divClone, {
            backgroundColor: null,
            width,
            height,
            scale: 1,
            useCORS: true,
        });
        const dataUrl = canvas.toDataURL("image/png");

        // Replace FO with rasterized <image>
        const imgElem = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "image"
        );
        imgElem.setAttribute("href", dataUrl);
        imgElem.setAttribute("x", fo.getAttribute("x"));
        imgElem.setAttribute("y", fo.getAttribute("y"));
        imgElem.setAttribute("width", width);
        imgElem.setAttribute("height", height);

        fo.parentNode.replaceChild(imgElem, fo);

        document.body.removeChild(tempContainer);
    }
};

/**
 * Clone the SVG and embed font or rasterize foreignObject
 */
const prepareSvgForExport = async (
    content,
    { x = 0, y = 0, width, height }
) => {
    let svg;

    if (content instanceof SVGSVGElement) {
        svg = content.cloneNode(true);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    } else {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

        const clonedContent = content.cloneNode(true);
        clonedContent.setAttribute("width", width);
        clonedContent.setAttribute("height", height);
        svg.appendChild(clonedContent);
    }

    // Rasterize any foreignObject text to images for canvas compatibility
    // await rasterizeForeignObjects(svg);

    return svg;
};

const svgToDataUrl = (svg) => {
    const serializer = new XMLSerializer();
    const svgXml = serializer.serializeToString(svg);
    return (
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(svgXml)))
    );
};

const drawSvgOnCanvas = (ctx, svgDataUrl, canvasWidth, canvasHeight) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            try {
                ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                resolve();
            } catch (e) {
                reject(e);
            }
        };
        img.onerror = reject;
        img.src = svgDataUrl;
    });
};

const downloadCanvasAsPng = (canvas, fileName = "export.png") => {
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = pngUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportSvgToImage = async (
    content,
    {
        x = 0,
        y = 0,
        width,
        height,
        dpiScale = DPI_SCALE,
        fileName = "export.png",
    }
) => {
    const { canvas, ctx } = createExportCanvas(width, height, dpiScale);
    const svg = await prepareSvgForExport(content, { x, y, width, height });
    const svgDataUrl = svgToDataUrl(svg);

    await drawSvgOnCanvas(ctx, svgDataUrl, width, height);
    downloadCanvasAsPng(canvas, fileName);
};

export const exportFrameToImage = async ({
    content,
    frame,
    dpiScale = DPI_SCALE,
}) => {
    const {
        x: { value: left },
        y: { value: top },
        width: { value: frameWidth },
        height: { value: frameHeight },
    } = frame;
    await exportSvgToImage(content, {
        x: left,
        y: top,
        width: frameWidth,
        height: frameHeight,
        dpiScale,
        fileName: `${frame.id || "frame"}.png`,
    });
};

export const exportCanvasToImage = async ({
    svgElement,
    dpiScale = DPI_SCALE,
    fileName = "canvas.png",
    padding = 50, // padding in SVG units
}) => {
    const bbox = svgElement.getBBox();

    const paddedBox = {
        x: bbox.x - padding,
        y: bbox.y - padding,
        width: bbox.width + padding * 2,
        height: bbox.height + padding * 2,
    };

    await exportSvgToImage(svgElement, {
        x: paddedBox.x,
        y: paddedBox.y,
        width: paddedBox.width,
        height: paddedBox.height,
        dpiScale,
        fileName,
    });
};
