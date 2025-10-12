import { DPI_SCALE } from "../constants";
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

const createExportCanvas = (width, height, dpiScale = 3) => {
    const canvas = document.createElement("canvas");
    canvas.width = width * dpiScale;
    canvas.height = height * dpiScale;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpiScale, dpiScale);
    return { canvas, ctx };
};

export const prepareSvgForExport = async (
    content,
    { x = 0, y = 0, width, height }
) => {
    const svg = createBaseSvg({ x, y, width, height });

    addFontDefinition(svg, CAVEAT_FONT_CSS);

    const clone = content.cloneNode(true);
    svg.appendChild(clone);

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

const getScaledBox = (bbox, scale, pan, padding = 0) => {
    const scaledX = bbox.x * scale;
    const scaledY = bbox.y * scale;
    const scaledWidth = bbox.width * scale;
    const scaledHeight = bbox.height * scale;

    return {
        x: pan.x + scaledX - padding,
        y: pan.y + scaledY - padding,
        width: scaledWidth + padding * 2,
        height: scaledHeight + padding * 2,
    };
};

const exportElementToImage = async ({
    element,
    bbox,
    fileName,
    dpiScale = DPI_SCALE,
    padding = 0,
}) => {
    const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
    const box = getScaledBox(bbox, scale, pan, padding);

    await exportSvgToImage(element, {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
        dpiScale,
        fileName,
    });
};

export const exportFrameToImage = async ({
    element,
    frame,
    dpiScale = DPI_SCALE,
}) => {
    const {
        width: { value: frameWidth },
        height: { value: frameHeight },
    } = frame;

    // We only care about x/y from the element and dimensions from frame
    const { x, y } = element.getBBox();
    const bbox = { x, y, width: frameWidth, height: frameHeight };

    await exportElementToImage({
        element,
        bbox,
        fileName: `${frame.id || "frame"}.png`,
        dpiScale,
    });
};

export const exportCanvasToImage = async ({
    element,
    dpiScale = DPI_SCALE,
    fileName = "canvas.png",
    padding = 50,
}) => {
    const bbox = element.getBBox();

    await exportElementToImage({
        element,
        bbox,
        fileName,
        dpiScale,
        padding,
    });
};
