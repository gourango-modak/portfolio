import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "../../utils/svgUtils";

export function createPenShape(shape) {
    const ns = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(ns, "g");
    g.setAttribute("transform", `translate(${shape.x}, ${shape.y})`);

    const strokePoints = getStroke(shape.points, {
        size: shape.properties.strokeWidth.value,
        thinning: shape.properties.thinning.value,
        smoothing: shape.properties.smoothing.value,
        streamline: shape.properties.streamline.value,
    });

    const pathData = getSvgPathFromStroke(strokePoints);
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", shape.properties.color.value);

    g.appendChild(path);
    return g;
}
