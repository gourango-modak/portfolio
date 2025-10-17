export function createFrameSvg(frame) {
    const ns = "http://www.w3.org/2000/svg";

    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", frame.x);
    rect.setAttribute("y", frame.y);
    rect.setAttribute("width", frame.width);
    rect.setAttribute("height", frame.height);
    rect.setAttribute("fill", frame.properties.bgColor.value);
    rect.setAttribute("stroke", frame.properties.borderColor.value);
    rect.setAttribute("stroke-width", frame.properties.strokeWidth.value);

    return rect;
}
