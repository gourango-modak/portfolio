import { useEffect, useRef } from "react";
import { useRenderLogger } from "../debugging/useRenderLogger";
import { ToolbarItems } from "./ToolbarItems";
import { ToolbarGrabber } from "./ToolbarGrabber";
import { ORIENTATION } from "../../../utils/common";
import { usePanelStore } from "../store/usePanelStore";

const Toolbar = ({ panelId, dragHandleRef }) => {
    const orientation = usePanelStore((s) => s.panels[panelId].orientation);
    const setPosition = usePanelStore((s) => s.setPosition);
    const openToolbarPanel = usePanelStore((s) => s.openToolbarPanel);
    const toolbarRef = useRef(null);

    useEffect(() => {
        if (!toolbarRef.current) return;
        const rect = toolbarRef.current.getBoundingClientRect();
        let x = 0;
        let y = 0;
        if (orientation === ORIENTATION.HORIZONTAL) {
            x = (window.innerWidth - rect.width) / 2;
            y = window.innerHeight - rect.height - 64;
        } else {
            x = 40;
            y = (window.innerHeight - rect.height) / 2;
        }
        setPosition(panelId, { x, y });
        openToolbarPanel();
    }, [toolbarRef]);

    useRenderLogger("Toolbar");

    return (
        <div
            className={`bg-white border border-gray-300 rounded-xl shadow-md p-2 cursor-default gap-2 flex ${
                orientation === ORIENTATION.HORIZONTAL ? "flex-row" : "flex-col"
            }`}
            ref={toolbarRef}
        >
            <ToolbarGrabber
                dragHandleRef={dragHandleRef}
                orientation={orientation}
            />
            <ToolbarItems orientation={orientation} />
        </div>
    );
};

export default Toolbar;
