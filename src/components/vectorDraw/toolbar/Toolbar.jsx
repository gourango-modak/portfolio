import { useEffect, useRef } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { ToolbarItems } from "./ToolbarItems";
import { ToolbarGrabber } from "./ToolbarGrabber";
import { ORIENTATION } from "../../../utils/common";
import { usePanelStore } from "../store/usePanelStore";
import { PANELS } from "../canvasUtils";

const Toolbar = () => {
    const panelId = PANELS.TOOLBAR_PANEL;
    const orientation = usePanelStore((s) => s.panels[panelId].orientation);
    const openToolbarPanel = usePanelStore((s) => s.openToolbarPanel);
    const toolbarRef = useRef(null);

    useEffect(() => {
        openToolbarPanel();
    }, [toolbarRef]);

    useRenderLogger("Toolbar");

    return (
        <div
            className={`bg-white border border-gray-300 rounded-xl shadow-md p-2 gap-2 flex ${
                orientation === ORIENTATION.HORIZONTAL ? "flex-row" : "flex-col"
            }`}
            id={PANELS.TOOLBAR_PANEL}
        >
            <ToolbarGrabber orientation={orientation} />
            <ToolbarItems orientation={orientation} />
        </div>
    );
};

export default Toolbar;
