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
            orientation: "vertical",
            preload: 1,
            pages: [
                { id: 1, ...defaultArtboardTemplate }, // always at least one artboard
            ],
            currentPageIndex: 0,
        },
    }));

    /** Create a new page with optional settings */
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
            return {
                ...prev,
                artboard: {
                    ...prev.artboard,
                    pages: [...prev.artboard.pages, newPage],
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
            debugger;
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
    const goToPage = (index, viewportWidth = 800, viewportHeight = 600) => {
        const page = canvasSettings.artboard.pages[index];
        if (!page) return;

        setCanvasSettings((prev) => ({
            ...prev,
            pan: getCenteredPan(page, viewportWidth, viewportHeight),
            artboard: {
                ...prev.artboard,
                currentPageIndex: index,
            },
        }));
    };

    /** Go to next page */
    const nextPage = (viewportWidth = 800, viewportHeight = 600) => {
        const current = canvasSettings.artboard.currentPageIndex;
        if (current < canvasSettings.artboard.pages.length - 1) {
            goToPage(current + 1, viewportWidth, viewportHeight);
        }
    };

    /** Go to previous page */
    const prevPage = (viewportWidth = 800, viewportHeight = 600) => {
        const current = canvasSettings.artboard.currentPageIndex;
        if (current > 0) {
            goToPage(current - 1, viewportWidth, viewportHeight);
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
