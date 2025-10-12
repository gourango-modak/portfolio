import { shapeToSvgElement } from "../shapes";
import { exportElementToImage } from "./exportElementToImage";

export const exportCanvasToImage = async ({
    shapes,
    padding = 50,
    scale = 1,
}) => {
    const exportGroup = createExportGroup(shapes);
    const bbox = calculateBoundingBox(shapes);

    return await exportElementToImage({
        element: exportGroup,
        bbox,
        padding,
        scale,
    });
};

function createExportGroup(shapes) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    Object.values(shapes).forEach((shape) => {
        const svgEl = shapeToSvgElement(shape);
        if (svgEl) g.appendChild(svgEl);
    });
    return g;
}

function calculateBoundingBox(shapesObj) {
    const shapes = Object.values(shapesObj || {});
    if (shapes.length === 0) return { x: 0, y: 0, width: 0, height: 0 };

    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    for (const shape of shapes) {
        const { x = 0, y = 0, width = 0, height = 0 } = shape;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    }

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
}
