import { useState } from "react";
import { CANVAS_MODES } from "./../canvas/canvasUtils";
import { ORIENTATION } from "./../../../utils/common";

export const useCanvasManager = () => {
    const defaultArtboardTemplate = {
        width: 800,
        height: 1200,
        bg: "#fff",
    };

    const [canvasSettings, setCanvasSettings] = useState(() => ({
        mode: CANVAS_MODES.INFINITE_CANVAS,
        scale: 1,
        pan: { x: 0, y: 0 },
        infiniteBg: "#f0f0f0",
        artboard: {
            ...defaultArtboardTemplate,
            spacing: 40,
            orientation: ORIENTATION.HORIZONTAL,
            preload: 1,
            pages: [{ id: 1, ...defaultArtboardTemplate }],
            currentPageId: 1,
        },
    }));

    /** Create a new page with optional settings and move to it */
    const createPage = (settings = {}) => {
        setCanvasSettings((prev) => {
            const newId =
                prev.artboard.pages.length > 0
                    ? Math.max(...prev.artboard.pages.map((p) => p.id)) + 1
                    : 1;
            const newPage = {
                id: newId,
                width: settings.width ?? prev.artboard.width,
                height: settings.height ?? prev.artboard.height,
                bg: settings.bg ?? prev.artboard.bg,
            };
            return {
                ...prev,
                artboard: {
                    ...prev.artboard,
                    pages: [...prev.artboard.pages, newPage],
                    currentPageId: newPage.id,
                },
            };
        });
    };

    const getArtboardPan = (page, topMargin = 50) => ({
        x: (window.innerWidth - page.width) / 2,
        y: topMargin,
    });

    const setMode = (mode, options = {}) => {
        setCanvasSettings((prev) => {
            let pages = prev.artboard.pages;

            if (mode === CANVAS_MODES.INFINITE_CANVAS) {
                pages = [];
            }

            if (
                [
                    CANVAS_MODES.SINGLE_ARTBOARD,
                    CANVAS_MODES.MULTI_ARTBOARD,
                    CANVAS_MODES.PAGED_CANVAS,
                ].includes(mode) &&
                pages.length === 0
            ) {
                pages = [{ id: 1, ...defaultArtboardTemplate }];
            }

            const currentPage =
                pages.find((p) => p.id === prev.artboard.currentPageId) ||
                pages[0];

            const pan =
                [
                    CANVAS_MODES.SINGLE_ARTBOARD,
                    CANVAS_MODES.MULTI_ARTBOARD,
                    CANVAS_MODES.PAGED_CANVAS,
                ].includes(mode) && currentPage
                    ? getArtboardPan(currentPage)
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
                    currentPageId: currentPage?.id ?? null,
                },
            };
        });
    };

    const getCurrentPage = () => {
        if (
            [
                CANVAS_MODES.SINGLE_ARTBOARD,
                CANVAS_MODES.MULTI_ARTBOARD,
                CANVAS_MODES.PAGED_CANVAS,
            ].includes(canvasSettings.mode)
        ) {
            return canvasSettings.artboard.pages.find(
                (p) => p.id === canvasSettings.artboard.currentPageId
            );
        }
        return null;
    };

    const goToPage = (id) => {
        const pageExists = canvasSettings.artboard.pages.some(
            (p) => p.id === id
        );
        if (!pageExists) return;

        setCanvasSettings((prev) => ({
            ...prev,
            artboard: {
                ...prev.artboard,
                currentPageId: id,
            },
        }));
    };

    const nextPage = () => {
        const pages = canvasSettings.artboard.pages;
        const currentId = canvasSettings.artboard.currentPageId;
        const currentIndex = pages.findIndex((p) => p.id === currentId);

        if (currentIndex < pages.length - 1) {
            goToPage(pages[currentIndex + 1].id);
        } else {
            createPage();
        }
    };

    const prevPage = () => {
        const pages = canvasSettings.artboard.pages;
        const currentId = canvasSettings.artboard.currentPageId;
        const currentIndex = pages.findIndex((p) => p.id === currentId);

        if (currentIndex > 0) {
            goToPage(pages[currentIndex - 1].id);
        }
    };

    return {
        canvasSettings,
        setCanvasSettings,
        setMode,
        getCurrentPage,
        goToPage,
        nextPage,
        prevPage,
        createPage,
    };
};
