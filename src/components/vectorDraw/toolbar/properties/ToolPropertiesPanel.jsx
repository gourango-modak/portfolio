import { useToolbarStore } from "../../store/useToolbarStore";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { toolRegistry } from "../../tools/toolRegistry";
import { ToolProperties } from "./ToolProperties";
import { usePanelStore } from "../../store/usePanelStore";

const ToolPropertiesPanel = () => {
    const closeToolPropertiesPanel = usePanelStore(
        (s) => s.closeToolPropertiesPanel
    );
    const activeTool = useToolbarStore((s) => s.activeTool);
    const tool = toolRegistry[activeTool];

    useRenderLogger("ToolPropertiesPanel");

    return (
        <div className="w-60 shadow-md bg-white rounded-md border border-gray-300 flex-col flex">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 cursor-grab active:cursor-grabbing select-none drag-handle">
                <h2 className="text-sm font-medium text-gray-800 truncate">
                    {tool.label} Properties
                </h2>
                <button
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full cursor-pointer"
                    onClick={closeToolPropertiesPanel}
                    aria-label="Close Properties Panel"
                >
                    ✕
                </button>
            </div>
            <ToolProperties activeTool={activeTool} />
        </div>
    );
};

export default ToolPropertiesPanel;
