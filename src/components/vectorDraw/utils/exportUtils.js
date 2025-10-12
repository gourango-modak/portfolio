import { canvasPropertiesSlice } from "../store/utils";
import { CAVEAT_FONT_CSS } from "./../fonts/caveatFont";

const parseInlineStyles = (styleString) => {
    const styleMap = {};
    if (!styleString) return styleMap;
    styleString.split(";").forEach((rule) => {
        const [key, value] = rule.split(":").map((s) => s && s.trim());
        if (key && value) styleMap[key] = value;
    });
    return styleMap;
};

const addFontDefinition = (svg, fontCss = "") => {
    const styleEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "style"
    );
    styleEl.setAttribute("type", "text/css");
    styleEl.textContent = fontCss;
    svg.appendChild(styleEl);
};

const convertForeignObjectsToText = (svg) => {
    const foreignObjects = svg.querySelectorAll("foreignObject");
    foreignObjects.forEach((fo) => {
        const htmlDiv = fo.querySelector("div");
        if (!htmlDiv) return;

        const textValue = htmlDiv.textContent || "";

        // Read inline style attributes directly
        const styleMap = parseInlineStyles(htmlDiv.getAttribute("style") || "");

        const fontSize = parseFloat(styleMap["font-size"] || 16);
        const lineHeight = parseFloat(styleMap["line-height"] || 1.3);
        const yStart = Number(fo.getAttribute("y") || 0);

        const textElem = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        textElem.setAttribute("x", fo.getAttribute("x") || 0);
        textElem.setAttribute("y", yStart + fontSize);
        textElem.setAttribute("fill", styleMap.color || "#000");
        textElem.setAttribute(
            "font-family",
            styleMap["font-family"] || "sans-serif"
        );
        textElem.setAttribute("font-size", fontSize + "px");
        textElem.setAttribute(
            "font-weight",
            styleMap["font-weight"] || "normal"
        );
        textElem.setAttribute(
            "letter-spacing",
            styleMap["letter-spacing"] || "normal"
        );

        // Split by newlines and create <tspan> for each line
        const lines = textValue.split(/\r?\n/);
        lines.forEach((line, i) => {
            const tspan = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "tspan"
            );
            tspan.setAttribute("x", fo.getAttribute("x") || 0);
            if (i > 0) {
                tspan.setAttribute("dy", fontSize * lineHeight);
            }
            tspan.textContent = line.trim() ? line : " "; // preserve empty lines
            textElem.appendChild(tspan);
        });

        fo.parentNode.replaceChild(textElem, fo);
    });
};

const createBaseSvg = ({ x, y, width, height }) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    const { canvasBgColor } = canvasPropertiesSlice.getSlice().properties;
    svg.style.background = canvasBgColor.value;

    return svg;
};

const createExportCanvas = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return { canvas, ctx };
};

export const prepareSvgForExport = async (
    element,
    { x = 0, y = 0, width, height }
) => {
    const svg = createBaseSvg({ x, y, width, height });
    addFontDefinition(svg, CAVEAT_FONT_CSS);
    svg.appendChild(element);
    convertForeignObjectsToText(svg);
    // document.body.appendChild(svg);
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

const exportSvgToImage = async (
    element,
    { x = 0, y = 0, width, height, fileName = "export.png" }
) => {
    const { canvas, ctx } = createExportCanvas(width, height);
    const svg = await prepareSvgForExport(element, { x, y, width, height });
    const svgDataUrl = svgToDataUrl(svg);

    await drawSvgOnCanvas(ctx, svgDataUrl, width, height);
    downloadCanvasAsPng(canvas, fileName);
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

const exportElementToImage = async ({
    element,
    bbox,
    fileName,
    padding = 0,
    scale = 1,
}) => {
    const elementToExport = wrapElementWithScale(element, scale);
    const box = getScaledBox(bbox, scale, padding);

    await exportSvgToImage(elementToExport, {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
        fileName,
    });
};

export const exportFrameToImage = async ({ element, frame, scale = 1 }) => {
    const {
        x,
        y,
        width: { value: frameWidth },
        height: { value: frameHeight },
    } = frame;
    const bbox = {
        x: x.value,
        y: y.value,
        width: frameWidth,
        height: frameHeight,
    };

    await exportElementToImage({
        element,
        bbox,
        fileName: `${frame.id || "frame"}.png`,
        scale,
    });
};

export const exportCanvasToImage = async ({
    element,
    fileName = "canvas.png",
    padding = 50,
    scale = 1,
}) => {
    const bbox = element.getBBox();

    await exportElementToImage({
        element,
        bbox,
        fileName,
        padding,
        scale,
    });
};
