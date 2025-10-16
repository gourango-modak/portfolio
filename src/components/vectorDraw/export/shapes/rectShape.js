import { getRoughRectPath } from "../../utils/svgUtils";

export function createRectShape(shape) {
    const ns = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(ns, "g");
    g.setAttribute("transform", `translate(${shape.x}, ${shape.y})`);

    const pathData = getRoughRectPath(
        0,
        0,
        shape.width,
        shape.height,
        shape.properties.roughness.value,
        shape.properties.strokeWidth.value,
        shape.seed
    );

    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", shape.properties.color.value);
    path.setAttribute("stroke-width", shape.properties.strokeWidth.value);
    path.setAttribute("fill", "transparent");

    g.appendChild(path);
    return g;
}
