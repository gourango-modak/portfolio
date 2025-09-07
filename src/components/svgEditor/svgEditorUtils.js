export function getSvgPathFromStroke(stroke) {
    if (!stroke.length) return "";
    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ["M", ...stroke[0], "Q"]
    );
    d.push("Z");
    return d.join(" ");
}

export const saveAsImage = (svgRef) => {
    const svg = svgRef.current;
    if (!svg) return;

    const clonedSvg = svg.cloneNode(true);
    clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clonedSvg.setAttribute("width", svg.clientWidth);
    clonedSvg.setAttribute("height", svg.clientHeight);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);

    const canvas = document.createElement("canvas");
    const scale = 3;
    canvas.width = svg.clientWidth * scale;
    canvas.height = svg.clientHeight * scale;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "drawing.png";
        link.click();
    };
    img.src = url;
};

export function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function getOpenArrowHead(start, end) {
    const len = 10;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const leftX = end.x - len * Math.cos(angle - Math.PI / 6);
    const leftY = end.y - len * Math.sin(angle - Math.PI / 6);
    const rightX = end.x - len * Math.cos(angle + Math.PI / 6);
    const rightY = end.y - len * Math.sin(angle + Math.PI / 6);
    return `M${leftX},${leftY} L${end.x},${end.y} L${rightX},${rightY}`;
}
