import { useEffect, useRef } from "react";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { ToolbarItems } from "./ToolbarItems";
import { ToolbarGrabber } from "./ToolbarGrabber";
import { ORIENTATION } from "../../../utils/common";
import { PANELS } from "../canvasUtils";
import { panelSlice } from "../store/storeUtils";
import { usePanelOrientation } from "../store/selectors/panelSelectors";

const Toolbar = () => {
    const panelId = PANELS.TOOLBAR_PANEL;
    const orientation = usePanelOrientation(panelId);
    const toolbarRef = useRef(null);
    const { openToolbarPanel } = panelSlice.getSlice();

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
