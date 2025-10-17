import { canvasPropertiesSlice } from "../../store/utils";
import { CAVEAT_FONT_CSS } from "./../../fonts/caveatFont";

export const exportSvgToImage = async (
    element,
    { x = 0, y = 0, width, height },
    background = false
) => {
    const { canvas, ctx } = createExportCanvas(width, height);
    const svg = await prepareSvgForExport(
        element,
        { x, y, width, height },
        background
    );
    const svgDataUrl = svgToDataUrl(svg);

    await drawSvgOnCanvas(ctx, svgDataUrl, width, height);
    return canvas.toDataURL("image/png");
};

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

const createBaseSvg = ({ x, y, width, height }, background = false) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    if (background) {
        const { canvasBgColor } = canvasPropertiesSlice.getSlice().properties;
        svg.style.background = canvasBgColor.value;
    }

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

const prepareSvgForExport = async (
    element,
    { x = 0, y = 0, width, height },
    background = false
) => {
    const svg = createBaseSvg({ x, y, width, height }, background);
    addFontDefinition(svg, CAVEAT_FONT_CSS);
    svg.appendChild(element);
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
