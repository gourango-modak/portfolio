import { useEffect } from "react";

const createPageRect = (page, x = 0, y = 0) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", page.width);
    rect.setAttribute("height", page.height);
    rect.setAttribute("fill", page.bg || "#fff");
    rect.setAttribute("stroke", page.border || "#ddd");
    return rect;
};

const drawSingleArtboard = (g, artboard) => {
    const page = artboard.pages?.[0] || artboard;
    g.appendChild(createPageRect(page));
};

const drawMultiArtboard = (g, artboard) => {
    artboard.pages.forEach((page, i) => {
        let offsetX = 0;
        let offsetY = 0;

        if (artboard.orientation === "vertical") {
            offsetY = i * (page.height + artboard.spacing);
        } else if (artboard.orientation === "horizontal") {
            offsetX = i * (page.width + artboard.spacing);
        }

        g.appendChild(createPageRect(page, offsetX, offsetY));
    });
};

const drawPagedArtboard = (g, artboard) => {
    // Find current page index by ID
    const currentIndex = artboard.pages.findIndex(
        (p) => p.id === artboard.currentPageId
    );

    if (currentIndex === -1) return; // current page not found

    const startPage = Math.max(0, currentIndex - artboard.preload);
    const endPage = Math.min(
        artboard.pages.length - 1,
        currentIndex + artboard.preload
    );

    for (let i = startPage; i <= endPage; i++) {
        const page = artboard.pages[i];
        g.appendChild(createPageRect(page)); // no stacking offset
    }
};

const drawShapes = (g, shapes, currentShape, canvasSettings) => {
    const { mode, artboard } = canvasSettings;

    shapes.forEach((s) => {
        if (s.page != null) {
            if (mode === "multi-artboard" && s.page < artboard.pages.length) {
                s.draw(g, true);
            } else if (
                mode === "paged-artboard" &&
                s.page === artboard.currentPageId
            ) {
                s.draw(g, true);
            } else if (mode === "single-artboard") {
                s.draw(g, true);
            }
        } else {
            s.draw(g, true);
        }
    });

    if (currentShape) currentShape.draw(g);
};

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

        const { scale, pan, mode, artboard } = canvasSettings;

        // Main <g> that handles pan + zoom
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute(
            "transform",
            `translate(${pan.x}, ${pan.y}) scale(${scale})`
        );

        // Draw artboards based on mode
        switch (mode) {
            case "single-artboard":
                drawSingleArtboard(g, artboard);
                break;
            case "multi-artboard":
                drawMultiArtboard(g, artboard);
                break;
            case "paged-artboard":
                drawPagedArtboard(g, artboard);
                break;
            default:
                break;
        }

        // Draw shapes on top
        drawShapes(g, shapes, currentShape, canvasSettings);

        svg.appendChild(g);
    }, [shapes, currentShape, currentShapeVersion, canvasSettings]);
};
