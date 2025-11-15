import { useEffect, useCallback } from "react";
import { PANELS } from "../constants";
import { panelSlice } from "../store/utils";

const updateToolbarPanelPosition = () => {
    const { setPosition, panels, viewport } = panelSlice.getSlice();
    const toolbarPanel = panels[PANELS.TOOLBAR_PANEL];

    const toolbarElement = document.getElementById(PANELS.TOOLBAR_PANEL);
    const panelWidth = toolbarElement?.offsetWidth || 0;
    const panelHeight = toolbarElement?.offsetHeight || 0;

    // Old position
    const oldX = toolbarPanel.position.x;
    const oldY = toolbarPanel.position.y;

    const oldWidth = viewport.width;
    const oldHeight = viewport.height;

    // New window size
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // FIX: use relative position based on usable space
    const relX = oldX / (oldWidth - panelWidth);
    const relY = oldY / (oldHeight - panelHeight);

    // Calculate position in new size
    let newX = relX * (newWidth - panelWidth);
    let newY = relY * (newHeight - panelHeight);

    // Clamp inside viewport
    newX = Math.max(0, Math.min(newX, newWidth - panelWidth));
    newY = Math.max(0, Math.min(newY, newHeight - panelHeight));

    const pos = { x: newX, y: newY };

    if (oldX !== newX || oldY !== newY) {
        setPosition(PANELS.TOOLBAR_PANEL, pos);
        toolbarElement.style.left = `${newX}px`;
        toolbarElement.style.top = `${newY}px`;
    }
};

export const useViewportLayout = () => {
    const handleResize = useCallback(() => {
        updateToolbarPanelPosition();
    }, []);

    useEffect(() => {
        let resizeTimer = null;

        const onResize = () => {
            // Clear ongoing timer
            if (resizeTimer) clearTimeout(resizeTimer);

            // Run only after resizing stops
            resizeTimer = setTimeout(() => {
                handleResize();
            }, 0);
        };

        window.addEventListener("resize", onResize);

        // Initial run
        handleResize();

        return () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            window.removeEventListener("resize", onResize);
        };
    }, [handleResize]);
};
