import { useEffect, useCallback } from "react";
import { PANELS } from "../constants";
import { panelSlice } from "../store/utils";
import { getToolbarPanelInitialPosition } from "../toolbar/utils";

const updateToolbarPanelPosition = () => {
    const { setPosition, panels } = panelSlice.getSlice();
    const toolbarPanel = panels[PANELS.TOOLBAR_PANEL];

    if (!toolbarPanel) return;

    const orientation = toolbarPanel.orientation;
    const curPos = toolbarPanel.position;

    const pos = getToolbarPanelInitialPosition({ orientation });

    // Check if the position needs updating
    if (curPos.x !== pos.x || curPos.y !== pos.y) {
        // Update position in the external state store
        setPosition(PANELS.TOOLBAR_PANEL, pos);

        // Direct DOM manipulation to reflect the new position
        const toolbarElement = document.getElementById(PANELS.TOOLBAR_PANEL);
        if (toolbarElement) {
            toolbarElement.style.left = `${pos.x}px`;
            toolbarElement.style.top = `${pos.y}px`;
        }
    }
};

export const useViewportLayout = () => {
    const handleResize = useCallback(() => {
        updateToolbarPanelPosition();
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        const initialTimer = setTimeout(() => handleResize(), 0);
        return () => {
            // Cleanup on unmount
            clearTimeout(initialTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);
};
