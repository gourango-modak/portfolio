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

        const { scale, pan, mode, artboard } = canvasSettings;

        // Main <g> that handles pan + zoom
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute(
            "transform",
            `translate(${pan.x}, ${pan.y}) scale(${scale})`
        );

        // ----------------- Single Artboard -----------------
        if (mode === "single-artboard") {
            const page = artboard.pages[0] || artboard;
            const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );
            rect.setAttribute("x", 0);
            rect.setAttribute("y", 0);
            rect.setAttribute("width", page.width);
            rect.setAttribute("height", page.height);
            rect.setAttribute("fill", page.bg || "#fff");
            rect.setAttribute("stroke", page.border || "#ddd");
            g.appendChild(rect);
        }

        // ----------------- Multi Artboard -----------------
        if (mode === "multi-artboard") {
            artboard.pages.forEach((page, i) => {
                const rect = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect"
                );

                const offset = i * (page.height + artboard.spacing);
                rect.setAttribute("x", 0);
                rect.setAttribute("y", offset);
                rect.setAttribute("width", page.width);
                rect.setAttribute("height", page.height);
                rect.setAttribute("fill", page.bg || "#fff");
                rect.setAttribute("stroke", page.border || "#ddd");
                g.appendChild(rect);
            });
        }

        // ----------------- Paged Artboard -----------------
        if (mode === "paged-artboard") {
            const startPage = Math.max(
                0,
                artboard.currentPageIndex - artboard.preload
            );
            const endPage = Math.min(
                artboard.pages.length - 1,
                artboard.currentPageIndex + artboard.preload
            );

            for (let i = startPage; i <= endPage; i++) {
                const page = artboard.pages[i];
                const rect = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect"
                );
                rect.setAttribute("x", 0);
                rect.setAttribute("y", 0); // no stacking offset
                rect.setAttribute("width", page.width);
                rect.setAttribute("height", page.height);
                rect.setAttribute("fill", page.bg || "#fff");
                rect.setAttribute("stroke", page.border || "#ddd");
                g.appendChild(rect);
            }
        }

        // ----------------- Draw Shapes -----------------
        shapes.forEach((s) => {
            // For paged/multi-artboard, draw only shapes for visible pages
            if (s.page != null) {
                if (
                    (mode === "multi-artboard" &&
                        s.page < artboard.pages.length) ||
                    (mode === "paged-artboard" &&
                        s.page >= startPage &&
                        s.page <= endPage)
                ) {
                    s.draw(g, true);
                }
            } else {
                // shapes without page info are drawn in all modes
                s.draw(g, true);
            }
        });

        if (currentShape) currentShape.draw(g);

        svg.appendChild(g);
    }, [shapes, currentShape, currentShapeVersion, canvasSettings]);
};
