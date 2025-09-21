import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useMemo } from "react";
import { INSPECTOR_PANEL_TARGETS } from "./propertiesUtils";
import { CanvasProperties } from "./CanvasProperties";
import { PageProperties } from "./PageProperties";
import { usePanelStore } from "../../store/usePanelStore";

const InspectorPanel = ({ panelId, dragHandleRef }) => {
    const target = usePanelStore((s) => s.panels[panelId].target);
    const closeInspectorPanel = usePanelStore((s) => s.closeInspectorPanel);

    const { title, content } = useMemo(() => {
        switch (target) {
            case INSPECTOR_PANEL_TARGETS.CANVAS:
                return {
                    title: "Canvas Properties",
                    content: <CanvasProperties />,
                };
            case INSPECTOR_PANEL_TARGETS.PAGE:
                return {
                    title: "Page Properties",
                    content: <PageProperties />,
                };
            default:
                return { title: "", content: null };
        }
    }, [target]);

    useRenderLogger("InspectorPanel");

    return (
        <div className="select-none w-60 shadow-md bg-white rounded-md border border-gray-300 flex flex-col">
            <div
                className="flex items-center justify-between px-3 py-2 border-b border-gray-100 cursor-grab active:cursor-grabbing select-none"
                ref={dragHandleRef}
            >
                <h2 className="text-sm font-medium text-gray-800 truncate">
                    {title}
                </h2>
                <button
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full cursor-pointer"
                    onClick={closeInspectorPanel}
                    aria-label="Close Settings Panel"
                >
                    ✕
                </button>
            </div>
            {content}
        </div>
    );
};

export default InspectorPanel;
