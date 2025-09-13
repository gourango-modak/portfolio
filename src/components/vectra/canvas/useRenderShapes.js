import { useEffect } from "react";

export const useRenderShapes = (
    svgRef,
    shapes,
    currentShape,
    currentShapeVersion,
    canvasSettings
) => {
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        svg.innerHTML = "";
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const { scale, pan } = canvasSettings;
        g.setAttribute(
            "transform",
            `translate(${pan.x}, ${pan.y}) scale(${scale})`
        );
        svg.appendChild(g);

        shapes.forEach((s) => s.draw(g, true));
        if (currentShape) currentShape.draw(g);
    }, [shapes, currentShape, currentShapeVersion, canvasSettings]);
};
