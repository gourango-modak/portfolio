export function createFrameSvg(frame) {
    const ns = "http://www.w3.org/2000/svg";

    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", frame.x.value);
    rect.setAttribute("y", frame.y.value);
    rect.setAttribute("width", frame.width.value);
    rect.setAttribute("height", frame.height.value);
    rect.setAttribute("fill", frame.bgColor.value || "transparent");
    rect.setAttribute("stroke", "rgba(0,0,0,0.2)");
    rect.setAttribute("stroke-width", 1);

    return rect;
}
