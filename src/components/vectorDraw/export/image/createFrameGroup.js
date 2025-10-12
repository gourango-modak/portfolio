import { createFrameSvg } from "../frames/frameSvg";
import { shapeToSvgElement } from "../shapes";

export const createFrameGroup = (frame, shapes) => {
    const exportG = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Add frame rectangle/background
    exportG.appendChild(createFrameSvg(frame));

    // Add all shapes belonging to this frame
    Object.values(shapes)
        .filter((s) => s.frameId === frame.id)
        .forEach((shape) => exportG.appendChild(shapeToSvgElement(shape)));

    return exportG;
};
