import { useState } from "react";

export const useCanvasManager = () => {
    const defaultArtboardTemplate = {
        width: 800,
        height: 1200,
        bg: "#fff",
        border: "#ddd",
        customStyle: {},
    };

    const [canvasSettings, setCanvasSettings] = useState(() => ({
        mode: "infinite", // "infinite" | "single-artboard" | "multi-artboard" | "paged-artboard"
        scale: 1,
        pan: { x: 0, y: 0 },

        // Infinite canvas background
        infiniteBg: "#f0f0f0",

        // Artboard configuration
        artboard: {
            ...defaultArtboardTemplate,
            spacing: 40,
            orientation: "horizontal", // "vertical" | "horizontal"
            preload: 1,
            pages: [
                { id: 1, ...defaultArtboardTemplate }, // always at least one artboard
            ],
            currentPageIndex: 0,
        },
    }));

    /** Create a new page with optional settings and move to it */
    const createPage = (settings = {}) => {
        setCanvasSettings((prev) => {
            const newPage = {
                id: prev.artboard.pages.length + 1,
                width: settings.width ?? prev.artboard.width,
                height: settings.height ?? prev.artboard.height,
                bg: settings.bg ?? prev.artboard.bg,
                border: settings.border ?? prev.artboard.border,
                customStyle: settings.customStyle ?? {},
            };

            const updatedPages = [...prev.artboard.pages, newPage];
            const newPageIndex = updatedPages.length - 1;

            return {
                ...prev,
                artboard: {
                    ...prev.artboard,
                    pages: updatedPages,
                    currentPageIndex: newPageIndex, // switch to the new page
                },
            };
        });
    };

    const getArtboardPan = (page, viewportWidth, topMargin = 50) => {
        return {
            x: (viewportWidth - page.width) / 2, // center horizontally
            y: topMargin, // fixed top margin
        };
    };

    /** Set canvas mode and optional overrides, center page if applicable */
    const setMode = (mode, options = {}, viewportWidth = 1600) => {
        setCanvasSettings((prev) => {
            let pages = prev.artboard.pages;

            // Clear pages for infinite mode
            if (mode === "infinite") pages = [];

            // Ensure at least one page exists for artboard modes
            if (
                [
                    "single-artboard",
                    "multi-artboard",
                    "paged-artboard",
                ].includes(mode) &&
                pages.length === 0
            ) {
                pages = [{ id: 1, ...defaultArtboardTemplate }];
            }

            const currentPage =
                pages[prev.artboard.currentPageIndex] || pages[0];
            const pan = [
                "single-artboard",
                "multi-artboard",
                "paged-artboard",
            ].includes(mode)
                ? getArtboardPan(currentPage, viewportWidth)
                : prev.pan;

            return {
                ...prev,
                mode,
                pan,
                infiniteBg: options.infiniteBg ?? prev.infiniteBg,
                artboard: {
                    ...prev.artboard,
                    ...options.artboard,
                    pages,
                    currentPageIndex: prev.artboard.currentPageIndex,
                },
            };
        });
    };

    /** Get current page */
    const getCurrentPage = () => {
        if (
            ["multi-artboard", "paged-artboard", "single-artboard"].includes(
                canvasSettings.mode
            )
        ) {
            return canvasSettings.artboard.pages[
                canvasSettings.artboard.currentPageIndex
            ];
        }
        return null;
    };

    /** Navigate to a specific page index, center it in viewport */
    const goToPage = (index) => {
        const page = canvasSettings.artboard.pages[index];
        if (!page) return;

        setCanvasSettings((prev) => ({
            ...prev,
            artboard: {
                ...prev.artboard,
                currentPageIndex: index,
            },
        }));
    };

    /** Go to next page (create a new one if it doesn't exist) */
    const nextPage = () => {
        const currentIndex = canvasSettings.artboard.currentPageIndex;
        const totalPages = canvasSettings.artboard.pages.length;

        if (currentIndex < totalPages - 1) {
            // Go to the next existing page
            goToPage(currentIndex + 1);
        } else {
            createPage();
        }
    };

    /** Go to previous page */
    const prevPage = () => {
        const current = canvasSettings.artboard.currentPageIndex;
        if (current > 0) {
            goToPage(current - 1);
        }
    };

    return {
        canvasSettings,
        setCanvasSettings,
        setMode,
        createPage,
        getCurrentPage,
        goToPage,
        nextPage,
        prevPage,
    };
};
