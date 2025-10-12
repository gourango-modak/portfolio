export function createArrowShape(shape) {
    const ns = "http://www.w3.org/2000/svg";

    const g = document.createElementNS(ns, "g");
    g.setAttribute("transform", `translate(${shape.x}, ${shape.y})`);

    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", shape.path);
    path.setAttribute("stroke", shape.properties.color.value);
    path.setAttribute("stroke-width", shape.properties.strokeWidth.value);
    path.setAttribute("fill", "transparent");

    g.appendChild(path);
    return g;
}
